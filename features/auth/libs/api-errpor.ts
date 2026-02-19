// lib/api-error.ts
export class ApiError extends Error {
  statusCode: number;
  reason?: string;

  constructor(message: string, statusCode: number, reason?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.reason = reason;
  }
}