import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../database/db";
import { rateLimitsTable } from "../database/schema";
import { ApiError, ApiResponse } from "../utils/apiResponse.utils";

const MAX_REQUESTS = 5;
const WINDOW_DURATION_MS = 60 * 1000; 

export const customRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    "unknown";
  const now = new Date();

  try {
    const [record] = await db
      .select()
      .from(rateLimitsTable)
      .where(eq(rateLimitsTable.ipAddress, ip))
      .limit(1);

    if (!record) {
      const resetAt = new Date(now.getTime() + WINDOW_DURATION_MS);

      await db.insert(rateLimitsTable).values({
        ipAddress: ip,
        requestCount: 1,
        resetAt: resetAt,
      });

      return next(); 
    }
    if (now > record.resetAt) {
      const newResetAt = new Date(now.getTime() + WINDOW_DURATION_MS);

      await db
        .update(rateLimitsTable)
        .set({
          requestCount: 1,
          resetAt: newResetAt,
          updatedAt: now,
        })
        .where(eq(rateLimitsTable.ipAddress, ip));

      return next(); 
    }
    if (record.requestCount >= MAX_REQUESTS) {
      const secondsRemaining = Math.max(
        0,
        Math.ceil((record.resetAt.getTime() - now.getTime()) / 1000),
      );
      
      return next(
        new ApiError(
          429,
          `Too Many Requests Rate limit exceeded.`,
          { url: null,  secondsRemaining: secondsRemaining },
        )
      );
    }
    await db
      .update(rateLimitsTable)
      .set({
        requestCount: record.requestCount + 1,
        updatedAt: now,
      })
      .where(eq(rateLimitsTable.ipAddress, ip));
      
    next();
  } catch (error) {
    console.error("Rate limiter integration error:", error);
    next();
  }
};