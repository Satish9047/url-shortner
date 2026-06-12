import { pgTable, text, timestamp, integer, uuid } from 'drizzle-orm/pg-core';

export const urlsTable = pgTable('urls', {
  shortCode: text('short_code').primaryKey(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clicksTable = pgTable('clicks', {
  id: uuid('id').defaultRandom().primaryKey(),
  shortCode: text('short_code')
    .notNull()
    .references(() => urlsTable.shortCode, { onDelete: 'cascade' }),
  clickedAt: timestamp('clicked_at').defaultNow().notNull(),
});