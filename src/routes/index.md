<script>
import {
  ToastNotification
} from 'carbon-components-svelte'
</script>

<ToastNotification 
  kind="info"
  title="Introduction"
  subtitle="This is the introduction"
/>

# What are UCANs?

User Controlled Authorization Networks (UCANs) are an extension of the popular [JSON Web Token](https://jwt.io/) format specifically designed to enable ways of authorizing offline-first apps and distributed systems by providing a set of credentials and permissions in a self-verifiable format.

## Sure, but what does that mean?

One way to think of UCANs is like a piece of ID, for example a driver's license. A driver's license has at least four important aspects:

* it is unique to you
* it asserts some information about you
* it enables you to do certain things
* a format with specific features that allow it to be verified by anyone

This is very similar to how UCANs work; let's break this down point by point.

1. Uniqueness. Your driver's license has a unique number, your driver's license number. It ( probably ) displays this in a human-readable format, but also in a machine-readable format. Similarly, UCANs use a [cryptographic key pair] as a way to provide a unique identity. When a UCAN is created, it is signed by your unique key, and anyone can use the *public key* in your key pair to verify this.

2. Embedded Information. Driver's licenses are used in our culture for a few different purposes: identity, as a way of verifying that you are allowed by the state to operate a motor vehicle, and some basic demographic information: date of birth, home address, height, weight, a picture of you. All of this is bundled onto a card in a way that allows a nightclub bouncer to verify your age, or a post office clerk to verify your home address when you're picking up a parcel. Similarly, UCANs contain a number of fields the provide context.

3. The state grants you permission to operate a motor vehicle via a driver's license. There are lots of other incidental use cases for the license as a form of ID, but motor vehicle licensing is the *primary* use case. UCANs are similar in that they embed specific [capabilities|permissions]. These 

4. Physical driver's licenses often include a number of specific formatting features that are very difficult to replicate, but are easy to identify. The purpose of this is to allow the aforementioned nightclub doorman to easily detect if your driver's license is fake or legitimate. Similarly, UCANs are self-verifiable: when a UCAN is created, a *proof* is included that can be verified using the issuer's public key. If the proof can be verified, we can be confident that all of the data embedded in the UCAN is genuine and has not been modified in transit.

<style>
</style>