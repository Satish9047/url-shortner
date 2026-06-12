import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ApiError } from "../utils/apiResponse.utils";

export const validateData = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
        if (error instanceof ZodError) {
            throw new ApiError(400, error.issues?.[0]?.message ?? "Invalid data");
        }
        throw new ApiError(400, "Invalid data");
    }
  };
};
