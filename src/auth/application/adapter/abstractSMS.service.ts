export abstract class AbstractSMSService {
  abstract sendAuthSMS(mobileNumber: string, authNumber: string): Promise<void>;
}
