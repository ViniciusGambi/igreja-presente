export const getformatedDate = (stringDate: string): string => {
  const d = new Date(stringDate);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [day, month, year].join('/');
};

export const getWeekDay = (stringDate: string): string => {
  const weekDays = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ];

  const d = new Date(stringDate);

  return weekDays[d.getDay()];
};

export const getFormatedHour = (stringDate: string): string => {
  const d = new Date(stringDate);
  const hour = d.getHours();
  const minutes = d.getMinutes();

  if (minutes === 0) {
    return `${hour}h`;
  }
  return `${hour}h${minutes}`;
};
