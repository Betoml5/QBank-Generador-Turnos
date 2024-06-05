export const getTimeMessage = (minutes: number): string => {
  if (minutes < 1) {
    return "Menos de un minuto";
  }

  if (minutes === 1) {
    return "Un minuto";
  }

  return `${minutes} minutos`;
};
