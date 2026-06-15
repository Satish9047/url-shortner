import { db } from "../database/db";
import { urlsTable, clicksTable } from "../database/schema";
import {  eq, and, gte, sql, desc } from "drizzle-orm";

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

export async function getAllUrls(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [countResult] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(urlsTable);

  const urls = await db
    .select({
      originalUrl: urlsTable.originalUrl,
      shortCode: urlsTable.shortCode,
      createdAt: urlsTable.createdAt,
    })
    .from(urlsTable)
    .orderBy(desc(urlsTable.createdAt))
    .limit(limit)
    .offset(offset);

  const total = countResult?.total ?? 0;

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: urls,
  };
}

export async function recordClick(code: string): Promise<void> {
  await db.insert(clicksTable).values({
    shortCode: code,
  });
}

// export async function getUrlAnalytics(code: any){
//   const result = await db.select({}).from(clicksTable).where(eq(clicksTable.shortCode, code));
//   return result ? result : null;
// }




export async function getUrlAnalytics(code: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const result = await db
    .select({
      date: sql<string>`date_trunc('day', ${clicksTable.clickedAt})::date`,
      clickCount: sql<number>`count(${clicksTable.id})::int`,
    })
    .from(clicksTable)
    .where(
      and(
        eq(clicksTable.shortCode, code),
        gte(clicksTable.clickedAt, sevenDaysAgo)
      )
    )
    .groupBy(sql`date_trunc('day', ${clicksTable.clickedAt})`)
    .orderBy(sql`date_trunc('day', ${clicksTable.clickedAt})`);

  return result ? result : null;
}