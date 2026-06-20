export interface ApiResponse<T> {
  status: string | number | null;
  message: string;
  data: T;
  success: boolean;
}
