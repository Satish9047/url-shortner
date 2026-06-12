import { db } from "../database/db";
import { urlsTable } from "../database/schema";

export async function saveUrlMapping(shortCode: string, originalUrl: string): Promise<void> {
  await db.insert(urlsTable).values({
    shortCode: shortCode,
    originalUrl: originalUrl,
  });
}