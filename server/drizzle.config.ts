import { defineConfig } from "drizzle-kit";
import {appConfig} from "./src/configs/app.config";

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: appConfig.DATABASE_URL!,
  },
});