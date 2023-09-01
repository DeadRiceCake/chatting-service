export interface SendSMSBody {
  type: 'SMS' | 'LMS' | 'MMS';
  contentType?: '(COMM | AD)';
  countryCode?: string;
  from: string;
  subject?: string;
  content: string;
  messages: MessageBody[];
  reserveTime?: string; // 'yyyy-MM-dd HH:mm'
  reserveTimeZone?: string;
}

export interface MessageBody {
  to: string;
  subject?: string;
  content?: string;
}
