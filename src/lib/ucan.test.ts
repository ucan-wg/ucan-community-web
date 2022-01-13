import type { TestInterface } from 'ava'
import type { EdKeypair } from 'ucans'

import anyTest from 'ava'
import * as ucan from 'ucans'
import { validate } from './ucan.js'

const test = anyTest as TestInterface<{ root: EdKeypair; child: EdKeypair; ancestor: EdKeypair }>

test.before(async t => {
  t.context.root = await ucan.keypair.EdKeypair.create()
  t.context.child = await ucan.keypair.EdKeypair.create()
  t.context.ancestor = await ucan.keypair.EdKeypair.create()
})

test('validates a ucan', async t => {
  const token = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const result = await validate(token)

  t.is(result.active, true)
  t.is(result.valid, true)
  t.is(result.validIssuer, true)
  t.is(result.validProofs, true)
})

test('validates a delegated ucan', async t => {
  const rootToken = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000,
    proofs: [ucan.encode(rootToken)]
  })

  const result = await validate(delegateToken)

  t.is(result.active, true)
  t.is(result.valid, true)
  t.is(result.validIssuer, true)
  t.is(result.validProofs, true)
})


test('validates a delegated ucan with two proofs', async t => {
  const rootTokenOne = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const rootTokenTwo = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      },
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000,
    proofs: [
      ucan.encode(rootTokenOne),
      ucan.encode(rootTokenTwo)
    ]
  })

  const result = await validate(delegateToken)

  t.is(result.active, true)
  t.is(result.valid, true)
  t.is(result.validIssuer, true)
  t.is(result.validProofs, true)
})



test('identifies a ucan that is not valid yet', async t => {
  const token = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    notBefore: 2637252774,
    expiration: 2637352774
  })

  const result = await validate(token)

  t.is(result.notValidYet, true)
})

test('identifies an expired ucan', async t => {
  const token = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 0
  })

  const result = await validate(token)

  t.is(result.active, false)
})

test('identifies an invalid signature', async t => {
  const token = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  // Invalid signature
  token.signature = 'PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='

  const result = await validate(token)

  t.is(result.valid, false)
})

test('identifies a mismatched delegate', async t => {
  const rootToken = await ucan.build({
    // Delegates to ancestor not child
    audience: t.context.ancestor.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000,
    proofs: [ucan.encode(rootToken)]
  })

  const result = await validate(delegateToken)

  t.is(result.validIssuer, false)
})

test('identifies when any proof has a mistmatched delegate', async t => {
  const rootTokenOne = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const rootTokenTwo = await ucan.build({
    // Audience is self, does not delegate
    audience: t.context.root.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      },
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000,
    proofs: [
      ucan.encode(rootTokenOne),
      ucan.encode(rootTokenTwo),
    ]
  })

  const result = await validate(delegateToken)

  t.is(result.validIssuer, false)
})

test('identifies an invalid proof', async t => {
  const rootToken = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  // Invalid signature
  rootToken.signature = 'PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000,
    proofs: [ucan.encode(rootToken)]
  })

  const result = await validate(delegateToken)

  t.is(result.validProofs, false)
})

test('identifies when any proof is invalid', async t => {
  const rootTokenOne = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  const rootTokenTwo = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000
  })

  // Invalid signature
  rootTokenTwo.signature = 'PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      },
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 1000,
    proofs: [
      ucan.encode(rootTokenOne),
      ucan.encode(rootTokenTwo),
    ]
  })

  const result = await validate(delegateToken)

  t.is(result.validProofs, false)
})

test('identifies multiple issues', async t => {
  const rootToken = await ucan.build({
    // Delegates to ancestor not child
    audience: t.context.ancestor.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 0
  })

  // Invalid signature
  rootToken.signature = 'PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    lifetimeInSeconds: 0,
    proofs: [ucan.encode(rootToken)]
  })

  // Invalid signature
  delegateToken.signature = 'PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='

  const result = await validate(delegateToken)

  t.is(result.active, false)
  t.is(result.valid, false)
  t.is(result.validIssuer, false)
  t.is(result.validProofs, false)
})