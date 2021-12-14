import type { Ucan } from 'ucans'

import * as ucan from 'ucans'
import * as uint8arrays from 'uint8arrays'

export type Validation = {
  notValidYet: boolean
  active: boolean
  valid: boolean
  validIssuer: boolean
  validProofs: boolean
}

export const decode = (token: string): Ucan | null => {
  try {
    return ucan.decode(token)
  } catch {
    return null
  }
}

export const validate = async (token: Ucan): Promise<Validation> => {
  const notValidYet = isNotValidYet(token)
  const active = !ucan.isExpired(token)
  const valid = await validateSignature(token)
  const [validIssuer, validProofs] = await validateProofs(token.payload.prf, token.payload.iss)

  return {
    notValidYet,
    active,
    valid,
    validIssuer,
    validProofs
  }
}

const validateSignature = async (token: Ucan): Promise<boolean> => {
  const encodedHeader = ucan.encodeHeader(token.header)
  const encodedPayload = ucan.encodePayload(token.payload)

  const data = uint8arrays.fromString(`${encodedHeader}.${encodedPayload}`)
  const signature = uint8arrays.fromString(token.signature, 'base64urlpad')

  return ucan.verifySignature(data, signature, token.payload.iss)
}

const validateProofs = (proofs: string[], delegate: string): Promise<[boolean, boolean]> => {
  const proofValidations = proofs.map(async proof => await validateProof(proof, delegate))

  return Promise.all(proofValidations).then(promisedValidations =>
    promisedValidations.reduce(([validIssuer, validProofs], validation) =>
      [validIssuer && validation.validIssuer, validProofs && validation.validProof],
      [true, true]
    )
  )
}

const validateProof = async (proof: string, delegate: string): Promise<{ validIssuer: boolean; validProof: boolean }> => {
  const token = decode(proof)

  const validIssuer: boolean = token?.payload.aud === delegate ? true : false
  let validProof: boolean

  if (token !== null) {
    try {
      validProof = await ucan.isValid(token)
    } catch {
      validProof = false
    }
  }

  return {
    validIssuer,
    validProof
  }
}

export const isNotValidYet = (ucan: Ucan): boolean => {
  return ucan.payload.nbf > Math.floor(Date.now() / 1000)
}