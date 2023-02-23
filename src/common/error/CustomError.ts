export class CustomError<T> extends Error {
  public httpCode!: number;
  public data?: T;

  constructor(httpCode: number, status: string, description: string, data?: T) {
    super(description);
    this.name = status;
    this.httpCode = httpCode;
    if (data) this.data = data;
  }
}
