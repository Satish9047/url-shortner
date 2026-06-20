export interface Link {
  shortCode: string;
  originalUrl: string;
}

export interface ClickData {
  date: string;
  clickCount: number;
}

export interface UrlItem {
  originalUrl: string | null;
  shortCode: string | null;
  createdAt: string | null;
}

export interface UrlResponse {
  data: UrlItem[],
  limit: number,
  page: number,
  total: number,
  totalPages: number
}
