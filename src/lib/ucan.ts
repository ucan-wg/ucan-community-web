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

export const decode = async (token: string): Promise<Ucan | null> => {
  try {
    return await ucan.validate(token, { checkIsExpired: false, checkIsTooEarly: false, checkSignature: false })
  } catch {
    return null
  }
}

export const validate = async (token: string): Promise<{ validation: Validation; ucan: Ucan } | null> => {
  const parsed = await decode(token)
  const [header, payload, signature] = token.split(".")
  if (parsed == null || header == null || payload == null || signature == null) {
    return null
  }
  const notValidYet = ucan.isTooEarly(parsed)
  const active = !ucan.isExpired(parsed)
  const valid = await ucan.verifySignatureUtf8(`${header}.${payload}`, signature, parsed.payload.iss)

  return {
    validation: {
      notValidYet,
      active,
      valid,
      validIssuer: true, // TODO
      validProofs: true // TODO
    },
    ucan: parsed,
  }
}

// const validateSignature = async (token: Ucan): Promise<boolean> => {
//   const encodedHeader = ucan.encodeHeader(token.header)
//   const encodedPayload = ucan.encodePayload(token.payload)

//   const data = uint8arrays.fromString(`${encodedHeader}.${encodedPayload}`)
//   const signature = uint8arrays.fromString(token.signature, 'base64url')

//   return ucan.verifySignature(data, signature, token.payload.iss)
// }

// const validateProofs = (proofs: string[], delegate: string): Promise<[boolean, boolean]> => {
//   const proofValidations = proofs.map(async proof => await validateProof(proof, delegate))

//   return Promise.all(proofValidations).then(promisedValidations =>
//     promisedValidations.reduce(([validIssuer, validProofs], validation) =>
//       [validIssuer && validation.validIssuer, validProofs && validation.validProof],
//       [true, true]
//     )
//   )
// }

// const validateProof = async (proof: string, delegate: string): Promise<{ validIssuer: boolean; validProof: boolean }> => {
//   const token = await decode(proof)

//   const validIssuer: boolean = token?.payload.aud === delegate ? true : false
//   let validProof: boolean

//   if (token !== null) {
//     try {
//       validProof = await ucan.isValid(token)
//     } catch {
//       validProof = false
//     }
//   }

//   return {
//     validIssuer,
//     validProof
//   }
// }
