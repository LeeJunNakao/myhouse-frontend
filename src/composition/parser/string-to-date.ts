interface DateString {
  day: string;
  month: string;
  year: string;
}

export const getDateElements = (word: string): DateString => {
  const dateArray = word.split('');
  const day = dateArray.slice(0, 2).join('');
  const month = dateArray.slice(2, 4).join('');
  const year = dateArray.slice(4, 8).join('');
  return { day, month, year };
};

const fillElement = (element = '', quantity: number): string => {
  const arrayElement = element.split('');
  const filling = [...Array(quantity)].map(() => ' ');
  arrayElement.push(...filling);
  const parsedElement = arrayElement.slice(0, quantity);
  return parsedElement.join('');
};

export const getDateString = ({ day, month, year }: DateString): string => {
  const filledDay = fillElement(day, 2);
  const filledMonth = fillElement(month, 2);
  const filledYear = fillElement(year, 4);

  return `${filledDay}/${filledMonth}/${filledYear}`;
};
