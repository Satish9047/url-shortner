import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string({ message: "Invalid URL" })
    .url({ message: "Invalid URL format" }),
});