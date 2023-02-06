export class ResponseBody<T> {
  status!: string;
  message!: string;
  additionalInfo?: T;

  constructor(status: string, message: string, additionalInfo?: T) {
    this.status = status;
    this.message = message;
    if (additionalInfo) this.additionalInfo = additionalInfo;
  }
}
