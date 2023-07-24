<script lang="ts">
  import OutlineHelper from '$components/OutlineHelper.svelte'
  import { OutboundLink } from 'carbon-components-svelte'
</script>

<OutlineHelper />

<div class="markdown-generated">

# Community

## UCAN Resources

### Blog Posts

- <OutboundLink href="https://fission.codes/blog/ipfs-thing-2023-ucan-decentralize-auth/">IPFS Thing 2023: Decentralizing Auth, and UCAN Too - Fission</OutboundLink>
- <OutboundLink href="https://fission.codes/blog/cod-summit-2022-recap/">CoD Summit 2022: Decentralized Authentication - Fission</OutboundLink>
- <OutboundLink href="https://fission.codes/blog/verifying-ucans/">Verifying UCANs - Fission</OutboundLink>
- <OutboundLink href="https://fission.codes/blog/auth-without-backend/">UCAN Authorizing Users Without a Back End - Fission</OutboundLink>
- <OutboundLink href="https://blog.web3.storage/posts/introducing-w3up">Get Started with the w3up-client Library - web3.storage</OutboundLink>
- <OutboundLink href="https://blog.web3.storage/posts/ucan-delegation-with-w3up">UCAN Delegation with w3up - web3.storage</OutboundLink>
- <OutboundLink href="https://blog.web3.storage/posts/intro-to-ucan">Intro to UCAN - web3.storage</OutboundLink>
- <OutboundLink href="https://nft.storage/docs/how-to/ucan/">Use UCAN Tokens for Delegated Authorization - NFT Storage</OutboundLink>
- <OutboundLink href="https://protocol.ai/blog/transcription-brooklyn-zelenka-decentralized-authentication/">Connecting All the World’s Users in an Open Way: Decentralized Authentication with Brooklyn Zelenka - Protocol Labs</OutboundLink>
- <OutboundLink href="https://hackmd.io/@U0QmLf-zRyyE600Km7fKIw/rJvt-j2Xo">Intro to UCAN - HackMD</OutboundLink>

### Games

- <OutboundLink href="https://ucan.lol/">UCAN.lol - A UCAN Adventure Game</OutboundLink>

### Talks

- <OutboundLink href="https://youtu.be/MuHfrqw9gQA">Decentralizing Auth, and UCAN Too - Brooklyn Zelenka</OutboundLink>
- <OutboundLink href="https://youtu.be/FXndHj4AKn8">Decentralized Authentication - Brooklyn Zelenka</OutboundLink>
- <OutboundLink href="https://youtu.be/wadcTxkUKdw">Yes, UCAN with James Walker, Fission.codes, and UCAN - FLOSS Weekly</OutboundLink>

### Community Calls

- <OutboundLink href="https://lu.ma/ucan">UCAN Community Call</OutboundLink>

### GitHub

- <OutboundLink href="https://github.com/ucan-wg/spec">Spec</OutboundLink>
- <OutboundLink href="https://github.com/ucan-wg/spec/discussions">UCAN Discussions</OutboundLink>

### Discord
- <OutboundLink href="https://discord.gg/zSfgeHhKxA">UCAN Discord Server</OutboundLink>

## Libraries

The UCAN specification has stabilized at version 0.10.0, which should be considered a 1.0.0 release candidate. Implementations are underway, and contributions are welcomed. Please visit the UCAN Discord if you would like to help out!

- <OutboundLink href="https://github.com/ucan-wg/rs-ucan">Rust</OutboundLink> (<OutboundLink href="https://lib.rs/crates/ucan">Crate</OutboundLink>)
- <OutboundLink href="https://github.com/ucan-wg/ts-ucan">TypeScript</OutboundLink> (<OutboundLink href="https://www.npmjs.com/package/@ucans/ucans">NPM</OutboundLink>)
- <OutboundLink href="https://github.com/ipld/js-dag-ucan">IPLD</OutboundLink> (<OutboundLink href="https://www.npmjs.com/package/@ipld/dag-ucan">NPM</OutboundLink>)
  
## UCAN Directory

| Company or Project Name | Description | How They've Implemented UCAN |
| ----------------------- | ----------- | ---------------------------- |
| <OutboundLink href="https://fission.codes/">Fission</OutboundLink> | Fission builds open-source protocols and managed solutions that empower developers to construct local-first and edge-ready software applications that are secure and scalable - without the complex backend. | Uses UCAN in <OutboundLink href="https://odd.dev/">ODD SDK</OutboundLink> and the <OutboundLink href="https://github.com/fission-suite/fission">Fission Server and CLI</OutboundLink> |
| <OutboundLink href="https://web3.storage/">web3.storage</OutboundLink> and <OutboundLink href="https://nft.storage/">nft.storage</OutboundLink> | Simple file storage with IPFS & Filecoin | Service authentication using decentralized identity |
| <OutboundLink href="https://subconscious.substack.com/p/noosphere-a-protocol-for-thought">Noosphere</OutboundLink> | A protocol for thought built on IPFS that syndicates notes, knowledge graphs, and other docs | Secures the protocol using UCAN authorized signing and encryption as part of its <OutboundLink href="https://subconscious.substack.com/p/layered-protocols">layered protocol design</OutboundLink>. <br>Authors of the Rust UCAN library, <OutboundLink href="https://github.com/ucan-wg/rs-ucan">rs-ucan</OutboundLink>. |
| <OutboundLink href="https://fileverse.io/">Fileverse</OutboundLink> | A file-sharing and collaboration dApp | Uses UCAN to authorize users based on DIDs stored in smart contracts. Their <OutboundLink href="https://fileverse.io/portal">Fileverse Portal</OutboundLink> allows users to manage authorization client side. |
| <OutboundLink href="https://blockenberg.xyz/">Blockenberg</OutboundLink> | A decentralized and headless CMS built on IPFS | Uses UCAN to enable passwordless login |
| <OutboundLink href="https://capyloon.org/">Capyloon</OutboundLink> | A resurrected version of Firefox OS built on top of the decentralized web technologies like the IPFS protocol | Capyloon users can locally create DIDs and use them to grant capabilities to 3rd party web sites through UCAN tokens, allowing selective access to device resources. |

</div>

<style>
</style>
