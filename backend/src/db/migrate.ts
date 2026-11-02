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
  await client.batch(
    [
      'ALTER TABLE loans ADD COLUMN due_date TEXT',
      `UPDATE loans SET due_date = date(borrowed_at, '+${LOAN_DURATION_DAYS} days')`,
    ],
    'write',
  );
}
