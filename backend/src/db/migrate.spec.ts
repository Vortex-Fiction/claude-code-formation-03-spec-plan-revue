import { mkdtempSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createClient } from '@libsql/client';
import { describe, expect, it } from 'vitest';
import { getDueDate } from '../loans/due-date';
import { createDatabase } from './database';
import { loans } from './schema';

const MAIN_CREATE_TABLES_SQL = `
CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  isbn TEXT NOT NULL UNIQUE,
  author_id INTEGER NOT NULL REFERENCES authors(id),
  is_available INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE loans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER NOT NULL REFERENCES books(id),
  borrower TEXT NOT NULL,
  borrowed_at TEXT NOT NULL,
  returned_at TEXT
);

INSERT INTO authors (name) VALUES ('Mary Shelley');
INSERT INTO books (title, isbn, author_id, is_available) VALUES ('Frankenstein', '9780141439471', 1, 0);
INSERT INTO books (title, isbn, author_id, is_available) VALUES ('The Last Man', '9780199552351', 1, 1);
INSERT INTO loans (book_id, borrower, borrowed_at, returned_at)
  VALUES (1, 'Ada', '2026-10-01T09:30:00.000Z', NULL);
INSERT INTO loans (book_id, borrower, borrowed_at, returned_at)
  VALUES (2, 'Grace', '2026-10-06T23:45:00.000Z', '2026-10-25T10:00:00.000Z');
`;

async function createMainDatabase(): Promise<string> {
  const folder = mkdtempSync(path.join(os.tmpdir(), 'library-main-'));
  const url = pathToFileURL(path.join(folder, 'library.db')).href;
  const client = createClient({ url });
  await client.executeMultiple(MAIN_CREATE_TABLES_SQL);
  client.close();
  return url;
}

describe('migrateDatabase', () => {
  it('gives a due date to each loan of a database that main created', async () => {
    const database = await createDatabase(await createMainDatabase());
    const storedLoans = await database.select().from(loans);
    expect(storedLoans.map((loan) => loan.dueDate)).toEqual(['2026-10-15', '2026-10-20']);
  });

  it('gives the same due date as a new loan with the same borrow time', async () => {
    const database = await createDatabase(await createMainDatabase());
    const storedLoans = await database.select().from(loans);
    for (const loan of storedLoans) {
      expect(loan.dueDate).toBe(getDueDate(new Date(loan.borrowedAt)));
    }
  });

  it('keeps the loans when it opens a migrated database again', async () => {
    const url = await createMainDatabase();
    await createDatabase(url);
    const database = await createDatabase(url);
    expect(await database.select().from(loans)).toHaveLength(2);
  });
});
