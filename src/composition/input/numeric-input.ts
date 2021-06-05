const isValidKey = (key: string): boolean => {
  if (Number.isNaN(Number(key)) && key !== '.' && key !== ',') return false;
  return true;
};

const getNewValue = (input: HTMLInputElement, inputValue: string, key: string): string => {
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  const space = (end as number) - (start as number);
  const wordArray = inputValue.split('');
  wordArray.splice(start, space, key);
  return wordArray.join('');
};

const validateNewWord = (word: string, regex: RegExp | null, event: KeyboardEvent) => {
  if (regex) {
    const result = word.match(regex);
    if (!result) event.preventDefault();
  }
};

export const acceptOnlyNumbers = (
  input: HTMLInputElement,
  inputValue: string,
  event: KeyboardEvent,
  regex: RegExp | null,
) => {
  const { key } = event;
  if (isValidKey(key)) {
    const word = getNewValue(input, inputValue, key);
    validateNewWord(word, regex, event);
  } else {
    event.preventDefault();
  }
};
