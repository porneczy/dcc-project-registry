export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('hu-HU').format(new Date(date))
}
