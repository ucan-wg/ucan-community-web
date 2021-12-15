import type { Ucan } from 'ucans'
import type { Validation } from '$lib/ucan'

import { decode, validate } from '$lib/ucan'

export type ProofTree = ProofNode | null

export type ProofNode = {
  label: string
  token: string
  ucan: Ucan
  validation: Validation
  proofs: ProofTree[]
  parent: ProofTree
}

export const createProofTree = async (token: string): Promise<ProofTree> => {
  const proofTree = await createTree(token, null)
  const labeledProofTree = labelTree(proofTree, 0)

  return labeledProofTree
}

const createTree = async (token: string, parent: ProofTree): Promise<ProofTree> => {
  const ucan = decode(token)

  if (ucan !== null) {
    const validation: Validation = await validate(ucan)

    const tree: ProofTree = {
      label: '',
      token,
      ucan,
      validation,
      parent,
      proofs: []
    }

    const promisedProofs = ucan.payload.prf.map(proof => createTree(proof, tree))
    tree.proofs = await Promise.all(promisedProofs)

    return tree
  } else {
    const tree: ProofTree = {
      label: '',
      token,
      ucan: null,
      validation: null,
      parent,
      proofs: []
    }

    return tree
  }
}

const labelTree = (root: ProofNode, index: number): ProofTree => {
  const queue = [root]

  while (queue.length > 0) {
    const currentNode = queue.shift()
    currentNode.label = label(index)
    index = index + 1

    currentNode.proofs.forEach(proof => {
      queue.push(proof)
    })
  }

  return root
}

const label = (index: number): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const chars = Math.ceil((index + 1) / 26)

  return alphabet[index].repeat(chars)
}

export const getDelegates = (node: ProofTree, chain: ProofTree[]): ProofNode[] => {
  if (node.parent !== null) {
    chain = [ node.parent, ...chain ]
    return getDelegates(node.parent, chain)
  }
  return chain 
}
