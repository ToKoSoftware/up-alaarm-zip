export interface ErrorHandler {
  message: string;
  error: string;
  status: number;
  type: string;
  stacktrace?: string[];
  context?: string;
  success: false;
}
