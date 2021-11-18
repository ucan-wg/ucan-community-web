import type { TestInterface } from 'ava';
import type { EdKeypair } from 'ucans';

import anyTest from 'ava'
import * as ucan from 'ucans'
import { validate } from './ucan.js'

const test = anyTest as TestInterface<{ root: EdKeypair, child: EdKeypair, ancestor: EdKeypair }>;

test.before(async t => {
  t.context.root = await ucan.keypair.EdKeypair.create();
  t.context.child = await ucan.keypair.EdKeypair.create();
  t.context.ancestor = await ucan.keypair.EdKeypair.create();
})

test('validates a ucan', async t => {
  const token = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
      }
    ],
    lifetimeInSeconds: 1000
  })

  const result = await validate(token)

  t.is(result.active, true)
  t.is(result.valid, true)
  t.is(result.validIssuer, true)
  t.is(result.validProof, null)
})

test('validates a delegated ucan', async t => {
  const rootToken = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
      }
    ],
    lifetimeInSeconds: 1000
  })

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.child,
    capabilities: [
      {
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
      }
    ],
    lifetimeInSeconds: 1000,
    proof: ucan.encode(rootToken)
  })

  const result = await validate(delegateToken)

  t.is(result.active, true)
  t.is(result.valid, true)
  t.is(result.validIssuer, true)
  t.is(result.validProof, true)
})

test('identifies an expired ucan', async t => {
  const token = await ucan.build({
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
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
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
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
    audience: t.context.child.did(),
    issuer: t.context.root,
    capabilities: [
      {
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
      }
    ],
    lifetimeInSeconds: 1000
  })

  const delegateToken = await ucan.build({
    audience: t.context.ancestor.did(),
    issuer: t.context.ancestor,
    capabilities: [
      {
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
      }
    ],
    lifetimeInSeconds: 1000,
    proof: ucan.encode(rootToken)
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
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
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
        "wnfs": "demouser.fission.name/public/photos/",
        "cap": "OVERWRITE"
      }
    ],
    lifetimeInSeconds: 1000,
    proof: ucan.encode(rootToken)
  })

  const result = await validate(delegateToken)

  t.is(result.validProof, false)
})