import dayjs from 'dayjs';
import { getDigitBanglaFromEnglish } from '@utils';

export const getAge = (data: any) => {
  const date1 = dayjs();
  const diff = date1.diff(dayjs(data), 'year', true);

  const years = Math.floor(diff);
  const remainingMonths = (diff - years) * 12;
  const months = Math.floor(remainingMonths);
  const days = Math.floor(
    (remainingMonths - months) * dayjs(date1).daysInMonth(),
  );

  const age = `${getDigitBanglaFromEnglish(
    years,
  )} বছর, ${getDigitBanglaFromEnglish(months)} মাস, ${getDigitBanglaFromEnglish(
    days,
  )} দিন`;
  return age;
};
