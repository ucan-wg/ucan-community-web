import * as ucan from 'ucans'

import type { Ucan } from 'ucans'

import { formatDate } from '$lib/utils'

export const headerFields = (token: Ucan) => {
  if (token !== null) {
    const ucv = token.header.ucv ?
      [{
        field: 'ucv',
        longName: 'UCAN Version',
        value: token.header.ucv,
        details: 'The UCAN version'
      }] : []

    return [
      {
        field: 'alg',
        longName: 'Signature Algorithm',
        value: token.header.alg,
        details: 'The algorithm used to sign the UCAN'
      },
      {
        field: 'typ',
        longName: 'Type',
        value: token.header.typ,
        details: 'UCANs are JWTs'
      },
      ...ucv
    ]
  } else {
    return []
  }
}

interface PayloadFieldInfo {
  field: string
  longName: string
  value: string[]
  details: string
}

export const payloadFields = (token: Ucan): PayloadFieldInfo[] => {
  if (token !== null) {
    const attenuations: PayloadFieldInfo[] = token.payload.att.length > 0 ?
      [{
        field: 'att',
        longName: 'Attenuation',
        value: token.payload.att.map(att => JSON.stringify(att, null, ' ')),
        details: 'Capabilities granted or delegated to the audience'
      }] : []

    const notBefore: PayloadFieldInfo[] = token.payload.nbf ?
      [{
        field: 'nbf',
        longName: 'Not Before',
        value: [`${token.payload.nbf}`],
        details: 'The UNIX time after which the UCAN is valid. ' +
          `This UCAN ${ucan.isTooEarly(token) ? 'will be' : 'became'} valid on ${formatDate(token.payload.nbf)}.`
      }] : []

    const facts: PayloadFieldInfo[] = token.payload.fct?.length > 0 ?
      [{
        field: 'fct',
        longName: 'Facts',
        value: token.payload.fct.map(fct => JSON.stringify(fct, null, ' ')),
        details: 'Extra facts or information attached to the UCAN'
      }] : []

    const proofs: PayloadFieldInfo[] = token.payload.prf.length > 0 ?
      [{
        field: 'prf',
        longName: 'UCAN Proofs',
        value: token.payload.prf,
        details: 'More encoded UCANs used as proofs for delegated capabilities'
      }] : []

    const nonce: PayloadFieldInfo[] = token.payload.nnc ?
      [{
        field: 'nnc',
        longName: 'Nonce',
        value: [`${token.payload.nnc}`],
        details: 'An optional nonce (number used once) used for uniqueness'
      }] : []

    return [
      {
        field: 'iss',
        longName: 'Issuer',
        value: [token.payload.iss],
        details: 'The DID of the issuer. The UCAN must be signed with the private key of the issuer to be valid.'
      },
      {
        field: 'aud',
        longName: 'Audience',
        value: [token.payload.aud],
        details: 'The DID of the audience'
      },
      ...attenuations,
      ...facts,
      {
        field: 'exp',
        longName: 'Expires At',
        value: [`${token.payload.exp}`],
        details: 'The UNIX time when the UCAN expires. ' +
          `This UCAN ${ucan.isExpired(token) ? 'expired' : 'expires'} on ${formatDate(token.payload.exp)}.`
      },
      ...notBefore,
      ...proofs,
      ...nonce
    ]
  } else {
    return []
  }
}