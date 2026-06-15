import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .url({ message: "Invalid URL. Please enter a valid URL" })
    .min(1, { message: "URL cannot be empty" }),
});
