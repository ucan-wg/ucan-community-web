import type { Capability, EncodedCapability, UcanPayload } from 'ucans'

import { capability } from 'ucans'

export const formatJson = (maybeJson: Record<string, unknown> | undefined): string => {
  return maybeJson !== undefined ?
    JSON.stringify(maybeJson, null, 2) :
    ''
}

export const formatPayload = (maybePayload: UcanPayload | undefined): string => {
  if (maybePayload !== undefined) {
    const att: EncodedCapability[] = maybePayload.att.map((cap: Capability) => capability.encode(cap))
    const payload = { ...maybePayload, att }

    return JSON.stringify(payload, null, 2)
  } else {
    return ''
  }
}

export function formatDate(timestamp: number): string {
  const date: Date = new Date(+timestamp * 1000)
  const lang: string = navigator.language

  const formatOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'long',
    timeStyle: 'long'
  }

  const formattedDate: string = new Intl.DateTimeFormat(
    lang,
    formatOptions
  ).format(date)

  return formattedDate
}