export const formatJson = (maybeJson: Record<string, unknown> | undefined) : string => {
  return maybeJson !== undefined ?
    JSON.stringify(maybeJson, null, 2) :
    ''
}