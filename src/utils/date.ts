export const timeAgo = (unixSeconds: number) => {
  const seconds = Math.floor(Date.now() / 1000) - unixSeconds
  const intervals = [
    { label: 'year', sec: 31536000 },
    { label: 'month', sec: 2592000 },
    { label: 'day', sec: 86400 },
    { label: 'hour', sec: 3600 },
    { label: 'minute', sec: 60 },
    { label: 'second', sec: 1 },
  ]

  for (const i of intervals) {
    const count = Math.floor(seconds / i.sec)
    if (count >= 1) return `${count} ${i.label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
