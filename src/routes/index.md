<script lang="ts">
  import github from "svelte-highlight/src/styles/github";
  import Highlight from "svelte-highlight"
  import typescript from "svelte-highlight/src/languages/typescript";
  import OutlineHelper from '$components/OutlineHelper.svelte'
</script>

<svelte:head>
  {@html github}
</svelte:head>

<OutlineHelper />

<div class="markdown-generated">

# Introduction to UCANs

User Controlled Authorization Networks (UCANs) are an extension of the popular [JSON Web Token](https://jwt.io/) format specifically designed to enable ways of authorizing offline-first apps and distributed systems.

At a high level, User Controlled Authorization Networks (UCANs) are a way of doing authorization ("what you can do") where users are fully in control. There's no all-powerful authorization server, or server of any kind required. Everything that a user is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format.

Since all accounts are equipped with a global ID and cryptographic keys, we were able to design a system that has very few assumptions and thus works in a huge number of situations.

This setup has several advantages:

* Low effort: developers don't need to write and maintain complex access logic
* Familiar: uses very common JSON Web Tokens (JWTs)
* Invisible: users don't need to know that anything special is happening
* Flexible: access can be granted as coarse or granular as the end users wants
* Scalable: no auth server bottleneck / scales infinitely
* Secure: military-grade encryption
* Collaborative: users and services can delegate a subset of their access to others
* Self-contained: the token contains all the information needed to verify it

UCANs are all you need to sign into multiple machines, delegate access for service providers to do things while you are offline, securely collaborate on documents with a team, and more. You get the flexibility of fine- or coarse-grained control, all controlled by the one who cares about the data the most: the user.

We've implemented this as the authorization system for Fission, and are also making this available as a building block for developers to solve user authorization and delegation within their own applications.

<h2>The UCAN data structure</h2>

Just like [JSON Web Tokens ( JWTs )](https://jwt.io/), UCANs consist of three parts separated by dots (.), which are:

* Header
* Payload
* Signature

Just like a JWT typically looks like the following.

<p>
  <span class=".eg-header"><code>Header</code></span>.<span class="eg-payload"><code>Payload</code></span>.<span class="eg-sig"><code>Signature</code></span>
</p>

Let's break down these different parts in more detail.

### Header

```
{
  "alg": "Ed25519",
  "typ": "JWT"
  "ucv": "0.7.0"
}
```

This is a standard JWT header, plus the extra `ucv` field.

* alg — the encryption algorithm used to create the UCAN
* typ — the type of token this is, this will always be 'JWT'
* ucv — "UCAN version" (so we can track the format of when it was issued)


### Payload

```
{
  "aud": "did:key:zStEZpzSMtTt9k2vszgvCwF4fLQQSyA15W5AQ4z3AR6Bx4eFJ5crJFbuGxKmbma4",
  "iss": "did:key:z5C4fuP2DDJChhMBCwAkpYUMuJZdNWWH5NeYjUyY8btYfzDh3aHwT5picHr9Ttjq",
  "nbf": 1588713622,
  "exp": 1589000000,
  "scp": "/"
  "ptc": "APPEND",
  "prf": null,
}
```
<br/>

|Field| Name | Description
|-----|---------------|------------------------------------------------------------------------------------------|
|aud  | "Audience"    |the ID of who it's intended for (the "to" field)
|iss  | "Issuer"      |ID of who sent it (the "from" field)
|nbf  | "Not before"  |Unix timestamp of when it becomes valid (typically when it was created, but not always)
|exp  | "Expiry"      |Unix timestamp of when it stops being valid
|scp  | "Scope"       |The scope of things it's able to change (e.g. a file system path)
|ptc  | "Potency"     |what rights come with the token (in this case it's append only)
|prf  | "Proof"       |an optional nested token with equal or greater privileges
<br/>

### Signature

These are then all signed with the user's private key. This key must match the public key in the iss field (user IDs are public keys), directly authenticating the token. As the token is a complete description of access, this token is self-validating with no need to look at other data or services.

## Delegation

What if you want to grant another user or service the ability to perform some action on your behalf? As long as they have a valid UCAN, they can wrap it in another with equal or lesser rights and include the original in the prf field.

Since every UCAN layer is self-signed, we can trace back to the root (no prf field), and know who the delegate is acting as. This chain of tokens is itself is the proof that you're perform some action. The nested proof is encoded as a bearer token. This is because it needs to include its signature to prove that it's valid, and a JWT signature is on the content encoded this way.

This token is thus valid as long as:

 * All token signatures are correct
 * The time range, potency, and scope of prf are greater-or-equal to the enclosing token
 * The outer token's iss field matches the prf's aud field (chain "to" and "from" correctly)
 * The timestamps are valid at the present time

## Hashing

These chains can get large, so you can optionally hash the outermost one before sending it to a server. This acts as a "content address", meaning that if the service hasn't seen it before, it can separately request that token, but if it already has it in cache and doesn't need to get it over the network. Since hashes are much smaller than their content, this can save a lot of bandwidth on repeated requests.

</div>

<style>
:global(.\.eg-header) {
  color: red;
}

:global(.eg-payload) {
  color: green;
}

:global(.eg-sig) {
  color: blue;
}
</style>
