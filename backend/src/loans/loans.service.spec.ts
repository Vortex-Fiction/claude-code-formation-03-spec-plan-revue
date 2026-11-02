import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import type { Loan } from '@formation/shared';
import { eq } from 'drizzle-orm';
import { beforeEach, describe, expect, it } from 'vitest';
import { BooksService } from '../books/books.service';
import { createDatabase, type Database } from '../db/database';
import { loans } from '../db/schema';
import { getDueDate, toDateOnly } from './due-date';
import { LoansService } from './loans.service';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

describe('LoansService', () => {
  let database: Database;
  let booksService: BooksService;
  let loansService: LoansService;
  let bookId: number;

  beforeEach(async () => {
    database = await createDatabase(':memory:');
    booksService = new BooksService(database);
    loansService = new LoansService(database, booksService);
    const [firstBook] = await booksService.list();
    bookId = firstBook.id;
  });

  async function borrowWithDueDate(dueDate: string): Promise<Loan> {
    const loan = await loansService.borrow({ bookId, borrower: 'Ada' });
    await database.update(loans).set({ dueDate }).where(eq(loans.id, loan.id));
    return loan;
  }

  function getToday(): string {
    return toDateOnly(new Date());
  }

  function getYesterday(): string {
    return toDateOnly(new Date(Date.now() - ONE_DAY_IN_MILLISECONDS));
  }

  it('lists a loan whose due date was yesterday as overdue', async () => {
    const loan = await borrowWithDueDate(getYesterday());
    expect((await loansService.listOverdue()).map((item) => item.id)).toEqual([loan.id]);
  });

  it('does not list a loan as overdue on its due date', async () => {
    await borrowWithDueDate(getToday());
    expect(await loansService.listOverdue()).toEqual([]);
  });

  it('does not list a returned loan as overdue', async () => {
    const loan = await borrowWithDueDate(getYesterday());
    await loansService.returnLoan(loan.id);
    expect(await loansService.listOverdue()).toEqual([]);
  });

  it('lists the overdue loans by due date', async () => {
    const [, secondBook] = await booksService.list();
    const laterLoan = await borrowWithDueDate(getYesterday());
    const earlierLoan = await loansService.borrow({ bookId: secondBook.id, borrower: 'Grace' });
    await database.update(loans).set({ dueDate: '2026-01-01' }).where(eq(loans.id, earlierLoan.id));
    expect((await loansService.listOverdue()).map((item) => item.id)).toEqual([
      earlierLoan.id,
      laterLoan.id,
    ]);
  });

  it('borrows an available book and marks it unavailable', async () => {
    const loan = await loansService.borrow({ bookId, borrower: 'Ada' });
    expect(loan.returnedAt).toBeNull();
    expect((await booksService.getById(bookId)).isAvailable).toBe(false);
  });

  it('borrows a book with a due date 14 days after the borrow day', async () => {
    const loan = await loansService.borrow({ bookId, borrower: 'Ada' });
    expect(loan.dueDate).toBe(getDueDate(new Date(loan.borrowedAt)));
  });

  it('rejects borrowing an unavailable book', async () => {
    await loansService.borrow({ bookId, borrower: 'Ada' });
    await expect(loansService.borrow({ bookId, borrower: 'Grace' })).rejects.toThrow(
      ConflictException,
    );
  });

  it('rejects a loan with an empty borrower', async () => {
    await expect(loansService.borrow({ bookId, borrower: '' })).rejects.toThrow(
      BadRequestException,
    );
  });

  it('rejects a loan without a book id', async () => {
    await expect(loansService.borrow({ borrower: 'Ada' })).rejects.toThrow(BadRequestException);
  });

  it('rejects borrowing a missing book', async () => {
    await expect(loansService.borrow({ bookId: 999, borrower: 'Ada' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('returns a loan and marks the book available again', async () => {
    const loan = await loansService.borrow({ bookId, borrower: 'Ada' });
    const returnedLoan = await loansService.returnLoan(loan.id);
    expect(returnedLoan.returnedAt).toBeTypeOf('string');
    expect((await booksService.getById(bookId)).isAvailable).toBe(true);
  });

  it('rejects returning a loan twice and keeps the first return date', async () => {
    const loan = await loansService.borrow({ bookId, borrower: 'Ada' });
    const returnedLoan = await loansService.returnLoan(loan.id);
    await loansService.borrow({ bookId, borrower: 'Grace' });
    await expect(loansService.returnLoan(loan.id)).rejects.toThrow(ConflictException);
    const [storedLoan] = (await loansService.list()).filter((item) => item.id === loan.id);
    expect(storedLoan.returnedAt).toBe(returnedLoan.returnedAt);
    expect((await booksService.getById(bookId)).isAvailable).toBe(false);
  });

  it('rejects returning a missing loan', async () => {
    await expect(loansService.returnLoan(999)).rejects.toThrow(NotFoundException);
  });

  it('lists the loans', async () => {
    await loansService.borrow({ bookId, borrower: 'Ada' });
    expect(await loansService.list()).toHaveLength(1);
  });
});
