export const currencyFormater = (value: number | string): string => {
  const v = String(Number(value).toFixed(2)).replace('.', ',');
  return v;
};
