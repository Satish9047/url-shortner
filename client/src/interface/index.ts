export interface ErrorResponse {
  status?: string;
  message?: string;
  data?: {
    secondsRemaining?: number;
  };
  success?: boolean;
}