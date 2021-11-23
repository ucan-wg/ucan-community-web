import * as ucan from 'ucans'

import type { Ucan } from 'ucans'

import { isNotValidYet } from '$lib/ucan'
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

export const payloadFields = (token: Ucan) => {
  if (token !== null) {
    const attenuations = token.payload.att ?
      token.payload.att.map(att => {
        let resource: [string, string]
        Object.entries(att).forEach(([key, value]) => {
          if (key !== 'cap') {
            resource = [key, value]
          }
        })

        return ({
          field: 'att',
          longName: 'Attenuation',
          value: `${att.cap}, ${resource[0]}: ${resource[1]} `,
          details: 'A capability granted on a resource to the audience'
        })
      }) : []

    const notBefore = token.payload.nbf ?
      [{
        field: 'nbf',
        longName: 'Not Before',
        value: token.payload.nbf,
        details: 'The UNIX time after which the UCAN is valid. ' +
          `This UCAN ${isNotValidYet(token) ? 'will be' : 'became'} valid on ${formatDate(token.payload.nbf)}.`
      }] : []

    const facts = token.payload.fct ?
      [{
        field: 'fct',
        longName: 'Facts',
        value: token.payload.fct,
        details: 'Extra facts or information attached to the UCAN'
      }] : []

    const proofs =
      [{
        field: 'prf',
        longName: 'UCAN Proofs',
        value: token.payload.prf ? 'Select Show Proof to inspect the next UCAN in the chain' : token.payload.prf,
        details: 'The proof chain of nested UCANs with equal or greater authority to grant the capabilities'
      }]

    return [
      {
        field: 'aud',
        longName: 'Audience',
        value: token.payload.aud,
        details: 'The DID of the audience'
      },
      ...attenuations,
      ...facts,
      {
        field: 'exp',
        longName: 'Expires At',
        value: token.payload.exp,
        details: 'The UNIX time when the UCAN expires. ' +
          `This UCAN ${ucan.isExpired(token) ? 'expired' : 'expires'} on ${formatDate(token.payload.exp)}.`
      },
      {
        field: 'iss',
        longName: 'Issuer',
        value: token.payload.iss,
        details: 'The DID of the issuer. The UCAN must be signed with the private key of the issuer to be valid.'
      },
      ...notBefore,
      ...proofs,
      // ...nonce
    ]
  } else {
    return []
  }
}