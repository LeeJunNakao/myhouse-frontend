export const dateToString = (date: Date): string => {
  const localeDate = date.toLocaleString('pt-br', { timeZone: 'UTC' });
  const onlyDate = localeDate.split(' ');
  return onlyDate[0];
};
