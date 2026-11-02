import { describe, expect, it } from 'vitest';
import { getDueDate, toDateOnly } from './due-date';

describe('getDueDate', () => {
  it('gives a due date 14 days after the borrow day, in UTC', () => {
    expect(getDueDate(new Date('2026-10-25T23:30:00.000Z'))).toBe('2026-11-08');
  });

  it('crosses the end of the year', () => {
    expect(getDueDate(new Date('2026-12-20T08:00:00.000Z'))).toBe('2027-01-03');
  });
});

describe('toDateOnly', () => {
  it('keeps the UTC calendar day of a moment', () => {
    expect(toDateOnly(new Date('2026-11-02T23:59:59.999Z'))).toBe('2026-11-02');
  });
});
