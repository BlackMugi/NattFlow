export const formatDateFr = (date: string): string =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

export const formatDateLongFr = (date: string): string =>
  new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  
export const getLast6Months = (): string[] => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  });
};