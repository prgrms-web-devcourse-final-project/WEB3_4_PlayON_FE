export function timeCalc(startDate: Date, endDate: Date): string {
  let diff = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);

  const days = Math.floor(diff / (3600 * 24));
  diff %= 3600 * 24;
  const hours = Math.floor(diff / 3600);
  diff %= 3600;
  const mins = Math.floor(diff / 60);
  const secs = diff % 60;
  diff %= 60;

  const parts = [];
  if (days > 0) parts.push(`${days}D`);
  if (hours > 0) parts.push(`${hours}H`);
  if (mins > 0) parts.push(`${mins}M`);
  parts.push(`${secs}S`);

  return parts.join(' ');
}
