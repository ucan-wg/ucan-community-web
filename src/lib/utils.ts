export const formatJson = (maybeJson: Record<string, unknown> | undefined): string => {
  return maybeJson !== undefined ?
    JSON.stringify(maybeJson, null, 2) :
    ''
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