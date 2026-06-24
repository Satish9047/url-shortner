export interface AppConfig {
    PORT: number | string;
    ENV: string;
    DATABASE_URL: string;
    BASE_SHORT_URL: string;
    URL_DIGIT_NUMBER: number;
    MAX_REQUESTS: number;
    WINDOW_DURATION_MS: number;
}