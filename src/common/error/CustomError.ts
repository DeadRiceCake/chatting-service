export class CustomError<T> extends Error {
  public httpCode!: number;
  public additionalInfo?: T;

  constructor(httpCode: number, status: string, description: string, additionalInfo?: T) {
    super(description);
    this.name = status;
    this.httpCode = httpCode;
    if (additionalInfo) this.additionalInfo = additionalInfo;
  }
}
