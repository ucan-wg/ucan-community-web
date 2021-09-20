import type { Ucan } from 'ucans';
import * as ucan from 'ucans';

export const decode = token => {
  try {
    const decodedUcan = ucan.decode(token);
    console.log(decodedUcan)
    return { ucan: decodedUcan, error: null };
  } catch {
    return { ucan: null, error: "Could not decode the token." }
  }
}

export const isValid = async (token: Ucan) => {
  if (token !== null) {
    return await ucan.isValid(token)
  } else {
    return false
  }
}

export const headerFields = (token: Ucan) => {
  if (token !== null) {
    const ucv = token.header.uav ?
      [{
        field: 'ucv',
        value: token.header.uav,
        details: 'The UCAN version'
      }] : []

    return [
      {
        field: 'alg',
        value: token.header.alg,
        details: 'The algorithm used to sign the UCAN'
      },
      {
        field: 'typ',
        value: token.header.typ,
        details: 'The token type. UCANs are JWTs'
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
        let resource: [string, string];
        Object.entries(att).forEach(([key, value]) => {
          if (key !== 'cap') {
            resource = [key, value];
          }
        });

        return ({
          field: 'att',
          value: `${att.cap}, ${resource[0]}: ${resource[1]} `,
          details: 'A capability granted on a resource to the audience'
        })
      }) : [];

    const notBefore = token.payload.nbf ?
      [{
        field: 'nbf',
        value: token.payload.nbf,
        details: 'The UNIX time after which the UCAN is valid'
      }] : []

      const facts = token.payload.fct ?
      [{
        field: 'fct',
        value: token.payload.fct,
        details: 'Extra facts or information attached to the UCAN'
      }] : []

    return [
      {
        field: 'aud',
        value: token.payload.aud,
        details: 'The DID of the audience'
      },
      ...attenuations,
      ...facts,
      {
        field: 'exp',
        value: token.payload.exp,
        details: 'The UNIX time when the UCAN expires'
      },
      {
        field: 'iss',
        value: token.payload.iss,
        details: 'The DID of the issuer. The UCAN must be signed with the private key of the issuer to be valid.'
      },
      ...notBefore,
      {
        field: 'prf',
        value: token.payload.prf,
        details: 'The proof chain of nested tokens with equal or greater authority to grant the capabilities'
      },
      // ...nonce
    ]
  } else {
    return []
  }
}
