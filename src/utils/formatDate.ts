export function formatDate(date: string | Date, style: 'long' | 'short' | 'year' = 'long'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (style === 'year') return d.getFullYear().toString();
  if (style === 'short')
    return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
  return d.toLocaleDateString('en-KE', { dateStyle: 'long' });
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = typeof start === 'string' ? new Date(start) : start;
  const e = typeof end === 'string' ? new Date(end) : end;
  const sStr = s.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' });
  const eStr = e.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${sStr} - ${eStr}`;
}
