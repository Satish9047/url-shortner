/**
 * @description                 ApiResponse class
 * @param           {number}    httpStatus
 * @param           {string}    message
 * @param           {T}         data
 * @returns         {ApiResponse}
 */
export class ApiResponse<T> {
  status: number;
  message: string;
  data: T | undefined;
  success: boolean;
  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status >= 200 && status < 400;
  }
}

/**
 * @description                 ApiError class
 * @param           {number}    status
 * @param           {string}    message
 * @param           {T}         data
 */
export class ApiError<T> extends Error {
  status: number;
  message: string;
  success: boolean;
  data: T | undefined;
  constructor(status: number, message: string, data?: T) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status >= 200 && status < 300;
  }
}