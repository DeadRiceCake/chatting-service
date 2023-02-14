export class CustomError<T> extends Error {
  public httpCode!: number;
  public additional_info?: T;

  constructor(httpCode: number, status: string, description: string, additional_info?: T) {
    super(description);
    this.name = status;
    this.httpCode = httpCode;
    if (additional_info) this.additional_info = additional_info;
  }
}
