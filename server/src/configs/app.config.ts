import dotenv from 'dotenv';
import { AppConfig } from '../interfaces';
dotenv.config();

export const appConfig: AppConfig = {
    PORT: process.env.PORT || 5000,
    ENV: process.env.NODE_ENV || 'dev',
    DATABASE_URL: process.env.DATABASE_URL as string,
    BASE_SHORT_URL: process.env.BASE_SHORT_URL as string,
    URL_DIGIT_NUMBER: 6,
    MAX_REQUESTS: 5,
    WINDOW_DURATION_MS: 6 * 1000
}
