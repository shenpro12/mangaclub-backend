export class ApiResponse {
  public readonly timestamp: Date;
  public readonly status: number;
  public readonly error: string;
  public readonly message: string;
  public readonly payload: any;
  constructor(status: number, message: string, error?: string, payload?: any) {
    this.timestamp = new Date(Date.now());
    this.status = status;
    this.message = message;
    this.error = error ? error : '';
    this.payload = payload ? payload : '';
  }
}
