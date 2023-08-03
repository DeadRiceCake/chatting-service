export class ResponseBody {
  message: string;
  data?: object;

  constructor(message: string, data?: object) {
    this.message = message;
    this.data = data;
  }
}
