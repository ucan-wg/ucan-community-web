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

  const { validation } = await validate(ucan.encode(token))

  t.is(validation.active, true)
  t.is(validation.valid, true)
  t.is(validation.validIssuer, true)
  t.is(validation.validProofs, true)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.active, true)
  t.is(validation.valid, true)
  t.is(validation.validIssuer, true)
  t.is(validation.validProofs, true)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.active, true)
  t.is(validation.valid, true)
  t.is(validation.validIssuer, true)
  t.is(validation.validProofs, true)
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

  const { validation } = await validate(ucan.encode(token))

  t.is(validation.notValidYet, true)
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

  const { validation } = await validate(ucan.encode(token))

  t.is(validation.active, false)
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

  const { validation } = await validate(ucan.encode(token))

  t.is(validation.valid, false)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.validIssuer, false)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.validIssuer, false)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.validProofs, false)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.validProofs, false)
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

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.active, false)
  t.is(validation.valid, false)
  t.is(validation.validIssuer, false)
  t.is(validation.validProofs, false)
})

test('generate valid example to show in app', async t => {
  const rootTokenOne = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/photos/',
        'cap': 'OVERWRITE'
      }
    ],
    expiration: 9256939505
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
    expiration: 9256939505
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
    expiration: 9256939505,
    proofs: [
      ucan.encode(rootTokenOne),
      ucan.encode(rootTokenTwo)
    ]
  })

  // console.log(ucan.encode(delegateToken))

  const { validation } = await validate(ucan.encode(delegateToken))

  t.is(validation.active, true)
  t.is(validation.valid, true)
  t.is(validation.validIssuer, true)
  t.is(validation.validProofs, true)
})

test('generate invalid example to show in app', async t => {
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
    expiration: 9256939505 
  })

  // Invalid signature
  rootToken.signature = 'PJf68hYl0_JaoMCTkNIavTwrxB98hRFoNh8jWH8rW7rQFmhge3Y4kbXnp0gLPGNBFZzQfgbdUHaS6xZrTfBdAg=='

  const rootTokenTwo = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        'wnfs': 'demouser.fission.name/public/notes/',
        'cap': 'OVERWRITE'
      }
    ],
    expiration: 9256939505
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
    expiration: 9256939505,
    proofs: [
      ucan.encode(rootToken),
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsInVjdiI6IjAuNy4wIn0.eyJhdWQiOiJkaWQ6a2V5Ono2TWt2cU52QzZTdWMyanFyczFEa3hIUVUxSm9VXZlUnE4Y2NnRWQ0RmpqVnZaIiwibmJmIjoxNjM5NjA4NzkzLCJwcmYiOltdfQ.yVYw8ctSDGb2lxeSL907OmnMYUNWyCb9TeFgGlgNb09tvhTAdM46zJILmp--cktsyHZfTnB-UUQE2QNZX5ZuAA', // encoding error
      ucan.encode(rootTokenTwo),
    ]
  })

  // console.log(ucan.encode(delegateToken))

  // TODO: Add expectation that this throws because one of the proofs has a bad encoding
  t.is(false, false)
})