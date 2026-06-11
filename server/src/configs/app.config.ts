import dotenv from 'dotenv';
import { AppConfig } from '../interfaces';
dotenv.config();

export const appConfig: AppConfig = {
    PORT: process.env.PORT || 5000,
    ENV: process.env.NODE_ENV || 'dev',
    DATABASE_URL: process.env.DATABASE_URL as string,
}
