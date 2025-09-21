import {
  SECONDS_IN_A_YEAR,
  SECONDS_IN_A_MONTH,
  SECONDS_IN_A_DAY,
  SECONDS_IN_AN_HOUR,
  SECONDS_IN_A_MINUTE,
} from './constants'

export const timeAgo = (unixSeconds: number) => {
  const seconds = Math.floor(Date.now() / 1000) - unixSeconds
  const intervals = [
    { label: 'year', sec: SECONDS_IN_A_YEAR },
    { label: 'month', sec: SECONDS_IN_A_MONTH },
    { label: 'day', sec: SECONDS_IN_A_DAY },
    { label: 'hour', sec: SECONDS_IN_AN_HOUR },
    { label: 'minute', sec: SECONDS_IN_A_MINUTE },
    { label: 'second', sec: 1 },
  ]

  for (const i of intervals) {
    const count = Math.floor(seconds / i.sec)
    if (count >= 1) return `${count} ${i.label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
