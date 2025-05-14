export const Convert12HrTo24Hr = (timeFormat: string) => {
  const splittedTime = timeFormat.split(' ');

  let [time, period] = splittedTime;

  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours < 12) {
    hours += 12;
  }

  if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:00`;
};

export const Convert24HrTo12Hr = (timeFormat: string) => {
  const [hours, minutes] = timeFormat.split(':');

  let period = 'AM';
  let mappedHour = parseInt(hours, 10);

  if (mappedHour >= 12) {
    period = 'PM';
    if (mappedHour > 12) {
      mappedHour -= 12;
    }
  }

  return `${mappedHour}:${minutes} ${period}`;
};
