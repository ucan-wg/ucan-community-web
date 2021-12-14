<script lang="ts">
  // const code = `let foo = "bar"`;
  // import Highlight from "svelte-highlight";
  import HighlightAuto from "svelte-highlight"
  import Highlight from "svelte-highlight"
  import typescript from "svelte-highlight/src/languages/typescript";
  import github from "svelte-highlight/src/styles/github";


const yarn_install = `yarn add ucans`;
const npm_install = `npm install --save`;
const typscript_eg = `import * as ucan from 'ucans'

// in-memory keypair
const keypair = await ucan.EdKeypair.create()
const u = await ucan.build({
  audience: audience.did(), //recipient
  issuer: keypair, //signing key
  capabilities: [ // permissions for ucan
    {
      "wnfs": "boris.fission.name/public/photos/",
      "cap": "OVERWRITE"
    },
    {
      "wnfs": "boris.fission.name/private/4tZA6S61BSXygmJGGW885odfQwpnR2UgmCaS5CfCuWtEKQdtkRnvKVdZ4q6wBXYTjhewomJWPL2ui3hJqaSodFnKyWiPZWLwzp1h7wLtaVBQqSW4ZFgyYaJScVkBs32BThn6BZBJTmayeoA9hm8XrhTX4CGX5CVCwqvEUvHTSzAwdaR",
      "cap": "APPEND"
    },
    {
      "email": "boris@fission.codes",
      "cap": "SEND"
    }
  ]
})
const token = ucan.encode(u) // base64 jwt-formatted auth token

// You can also use your own signing function if you're bringing your own key management solution
const { header, payload } = await ucan.buildParts(...)
const u = await ucan.addSignature(header, payload, signingFn)}`;

</script>

<svelte:head>
  {@html github}
</svelte:head>

<div class="markdown-generated">

# Getting started

The `ucans` library is a typescript utility that provides support for both parsing and creating UCANs in either Node JS or modern browsers.

## Installation

### NPM:

<HighlightAuto code={npm_install} />

### yarn:

<HighlightAuto code={yarn_install} />

## Examples

Typescript:

<Highlight language={typescript} code={typscript_eg} />

### Next steps

 * [`ucans` library github repo](https://github.com/ucan-wg/ucan-check)
 * [Fission Whitepaper](https://whitepaper.fission.codes/authorization/id-overview)

</div>
<style>
</style>