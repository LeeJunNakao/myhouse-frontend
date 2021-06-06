export const getOnlyNumberString = (word: string) => {
  const arr = word.split('');
  return arr.filter((i) => Number(i) || i === '0').join('');
};
