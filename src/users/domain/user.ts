export class User {
  constructor(
    private id: string,
    private mobileNumber: string,
    private isActivated: boolean,
    private role: string,
    private nickname: string,
    private ratingScore: number,
    private createdAt: Date,
  ) {}
}
