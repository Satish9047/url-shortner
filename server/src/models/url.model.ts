import { db } from "../database/db";
import { urlsTable, clicksTable } from "../database/schema";
import {eq} from "drizzle-orm"

export async function saveUrlMapping(shortCode: string, originalUrl: string): Promise<void> {
  await db.insert(urlsTable).values({
    shortCode: shortCode,
    originalUrl: originalUrl,
  });
}

export async function getOriginalUrl(code: string): Promise<string | null> {
  const result = await db
    .select({
      originalUrl: urlsTable.originalUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code))
    .limit(1);
  return result[0] ? result[0].originalUrl : null;
}

export async function getAllUrls(){
  const result = await db.select({originalUrl: urlsTable.originalUrl, shortCode: urlsTable.shortCode }).from(urlsTable)
  return result ? result : null;
}

export async function recordClick(code: string): Promise<void> {
  await db.insert(clicksTable).values({
    shortCode: code,
  });
}