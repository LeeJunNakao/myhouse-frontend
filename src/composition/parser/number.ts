export const fromCurrencyToNumber = (value: string): number => {
  return Number(value.replace(',', '.'));
};
