export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: 'long' }).format(date);
}
