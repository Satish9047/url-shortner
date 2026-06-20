export interface Link {
  shortCode: string;
  originalUrl: string;
}

export interface ClickData {
  date: string;
  clickCount: number;
}

export interface UrlResponse {
    originalUrl: string;
    shortCode: string;
    createdAt: string;
}
