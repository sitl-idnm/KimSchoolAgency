export function applyPhoneMask(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits.startsWith('7') ? digits : '7' + digits
  let out = '+7'
  if (d.length > 1) out += ' (' + d.slice(1, 4)
  if (d.length > 4) out += ') ' + d.slice(4, 7)
  if (d.length > 7) out += '-' + d.slice(7, 9)
  if (d.length > 9) out += '-' + d.slice(9, 11)
  return out
}
