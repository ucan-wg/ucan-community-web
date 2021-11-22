import type { Ucan } from 'ucans'

import * as ucan from 'ucans'
import * as uint8arrays from 'uint8arrays'

export type Validation = {
  notValidYet: boolean
  active: boolean
  valid: boolean
  validIssuer: boolean
  validProof: boolean | null
}

export const decode = (token: string): Ucan | null => {
  try {
    return ucan.decode(token)
  } catch {
    return null
  }
}

export const validate = async (token: Ucan): Promise<Validation> => {
  let validProof: boolean | null
  let validIssuer: boolean

  const notValidYet = isNotValidYet(token)
  const active = !ucan.isExpired(token)
  const valid = await validateSignature(token)

  if (token.payload.prf !== null) {
    [validIssuer, validProof] = await validateProof(token.payload.prf, token.payload.iss)
  } else {
    // root issuer needs no proof
    validIssuer = true
    validProof = null
  }

  return {
    notValidYet,
    active,
    valid,
    validIssuer,
    validProof
  }
}

const validateSignature = async (token: Ucan): Promise<boolean> => {
  const encodedHeader = ucan.encodeHeader(token.header)
  const encodedPayload = ucan.encodePayload(token.payload)

  const data = uint8arrays.fromString(`${encodedHeader}.${encodedPayload}`)
  const signature = uint8arrays.fromString(token.signature, 'base64urlpad')

  return ucan.verifySignature(data, signature, token.payload.iss)
}

const validateProof = async (proof: string, delegate: string): Promise<[boolean,boolean]> => {
  const token = decode(proof)

  const validIssuer = token?.payload.aud === delegate ? true : false
  let validProof

  if (token !== null) {
    try {
      validProof = await ucan.isValid(token)
    } catch {
      validProof = false
    }
  }

  return [
    validIssuer,
    validProof
  ]
}

export const isNotValidYet = (ucan: Ucan): boolean => {
  return ucan.payload.nbf > Math.floor(Date.now() / 1000)
}