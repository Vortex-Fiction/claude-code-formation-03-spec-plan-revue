import type { Client } from '@libsql/client';
import { LOAN_DURATION_DAYS } from '../loans/due-date';

async function hasColumn(client: Client, table: string, column: string): Promise<boolean> {
  const result = await client.execute(`PRAGMA table_info(${table})`);
  return result.rows.some((row) => row.name === column);
}

export async function migrateDatabase(client: Client): Promise<void> {
  if (await hasColumn(client, 'loans', 'due_date')) {
    return;
  }
  const transaction = await client.transaction('write');
  try {
    await transaction.execute('ALTER TABLE loans ADD COLUMN due_date TEXT');
    await transaction.execute(
      `UPDATE loans SET due_date = date(borrowed_at, '+${LOAN_DURATION_DAYS} days')`,
    );
    const loansWithoutDueDate = await transaction.execute(
      'SELECT id FROM loans WHERE due_date IS NULL',
    );
    if (loansWithoutDueDate.rows.length > 0) {
      throw new Error(
        `Migration failed: ${loansWithoutDueDate.rows.length} loan(s) have no due date`,
      );
    }
    await transaction.commit();
  } finally {
    transaction.close();
  }
}
