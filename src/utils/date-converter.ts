import dayjs from 'dayjs';

interface Props {
  dateFormat: string;
  format?: string;
}

export const FORMAT_START = 'START';
export const FORMAT_END = 'END';

export const addTimeInDate = ({ dateFormat }: Props) => {
  return dayjs(dateFormat).format('YYYY-MM-DDTHH:mm:ss');
};

export const removeTimeInDate = ({ dateFormat }: Props) => {
  if (dateFormat) return dayjs(dateFormat).format('YYYY-MM-DD HH:mm');
};

export const addTimeInDateOfElection = ({ dateFormat, format }: Props) => {
  if (format === FORMAT_START) {
    const modifiedDate = dayjs(dateFormat)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0);
    return modifiedDate.format('YYYY-MM-DDTHH:mm:ss');
  } else if (format === FORMAT_END) {
    const modifiedDate = dayjs(dateFormat)
      .set('hour', 23)
      .set('minute', 59)
      .set('second', 59);
    return modifiedDate.format('YYYY-MM-DDTHH:mm:ss');
  }
};

export const removeTimeInDateOfElection = ({ dateFormat }: Props) => {
  return dayjs(dateFormat).format('YYYY-MM-DD');
};
