export interface ErrorResponse {
  status?: string;
  message?: string;
  data?: {
    secondsRemaining?: number;
  };
  success?: boolean;
}

export interface Link {
  shortCode: string;
  originalUrl: string;
}

export interface ClickData {
  date: string;
  clickCount: number;
}