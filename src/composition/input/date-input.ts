import { getDateElements, getDateString, getOnlyNumberString } from '@/composition/parser';

const isValidKey = (key: string) => {
  if (Number.isNaN(Number(key))) return false;
  return true;
};

const getNewDate = (input: HTMLInputElement, inputValue: string, character: string) => {
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  const space = (end as number) - (start as number);
  const wordArray = inputValue.split('');
  wordArray.splice(start, space, character);
  return wordArray.join('');
};

const validateFormat = (date: string, event: KeyboardEvent) => {
  const dateArray = date.split('');
  const day = dateArray.slice(0, 2).join('');
  const month = dateArray.slice(2, 4).join('');
  const year = dateArray.slice(4, 9).join('');
  const dayRegex = /^(0[1-9]?|[1-2][0-9]?|3[0-1]?)$/;
  const monthRegex = /^(0[1-9]?|1[0-2]?)$/;
  const yearRegex = /^(19?|2[0-9]?|(19|2[0-9])[0-9]{0,2})$/;
  if (day && !day.match(dayRegex)) event.preventDefault();
  if (month && !month.match(monthRegex)) event.preventDefault();
  if (year && !year.match(yearRegex)) event.preventDefault();
};

export const acceptDateFormat = (
  input: HTMLInputElement,
  inputValue: string,
  event: KeyboardEvent,
) => {
  const { key } = event;
  if (isValidKey(key)) {
    const newDate = getNewDate(input, inputValue, key);
    validateFormat(newDate, event);
  } else {
    event.preventDefault();
  }
};

export const setInputValueFormatted = (value: string, setValue: (word: string) => void) => {
  const onlyNumber = getOnlyNumberString(value);
  const date = getDateElements(onlyNumber);
  const formatted = getDateString(date);
  setValue(formatted);
};
