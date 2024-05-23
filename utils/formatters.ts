export const formatAuthor = (author: string): string => author.replace(/^([^,]*),\s*(.*)$/, '$2 $1')
