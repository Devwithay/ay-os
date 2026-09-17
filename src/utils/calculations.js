export function getCompletionPercentage(completed, total) {
  if (!total) return 0;

  return Math.round((completed / total) * 100);
}

export function getAverage(values) {
  if (!values.length) return 0;

  const total = values.reduce((sum, value) => sum + Number(value), 0);

  return Math.round((total / values.length) * 100) / 100;
}

export function getDaysBetween(startDate, endDate = new Date()) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();

  return Math.max(
    0,
    Math.floor(difference / (1000 * 60 * 60 * 24))
  );
}