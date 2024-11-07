export const formatAuthor = (author: string): string => author.replace(/^([^,]*),\s*(.*)$/, '$2 $1')

export const formatString = (str: string, values: Record<string, string>): string =>
  str.replace(/{(.*?)}/g, (match, key) => values[key] || match)
