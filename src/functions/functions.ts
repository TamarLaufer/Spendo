export const formatAmount = (amount: number | string) => {
  const isDecimal = Number(amount) % 1 !== 0;
  const formatter = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: isDecimal ? 2 : 0,
    maximumFractionDigits: isDecimal ? 2 : 0,
  });
  const n = typeof amount === 'string' ? Number(amount) : amount;
  if (isNaN(n)) return '';

  return formatter.format(n);
};
