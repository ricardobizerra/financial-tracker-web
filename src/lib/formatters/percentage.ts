export function formatPercentage(value: number): string {
  const formatted = value.toFixed(2);
  return formatted.replace(/\.?0+%?$/, '').replace('.', ',') + '%';
}

export function extractPercentage(value: string): number {
  return parseFloat(value.replace('%', '').replace(',', '.')) || 0;
}
