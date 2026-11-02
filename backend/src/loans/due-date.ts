export const LOAN_DURATION_DAYS = 14;

const DATE_ONLY_LENGTH = 'YYYY-MM-DD'.length;

export function toDateOnly(moment: Date): string {
  return moment.toISOString().slice(0, DATE_ONLY_LENGTH);
}

export function getDueDate(borrowedAt: Date): string {
  const dueAt = new Date(borrowedAt);
  dueAt.setUTCDate(dueAt.getUTCDate() + LOAN_DURATION_DAYS);
  return toDateOnly(dueAt);
}
