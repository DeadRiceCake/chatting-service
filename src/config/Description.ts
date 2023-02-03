export const RESPONSE_DESCRIPTION = {
  SUCCESS: {
    OK: '오류가 없습니다.',
    CREATED: '생성되었습니다.',
  },

  CLIENT_ERROR: {
    //Common
    NOT_FOUND: '존재하지 않는 URL입니다.',
    INVALID_ARGUMENT:
      '클라이언트가 잘못된 인수를 지정했습니다. 자세한 내용은 오류 메시지와 오류 세부정보에서 확인하세요.',
    ALREADY_EXISTS: '이미 존재하는 데이터입니다.',

    //Authentication
    EXPIRED_TOKEN: '만료된 토큰입니다.',
    NO_TOKEN: '토큰이 존재하지 않습니다.',
    PERMISSION_DENIED: '권한이 없습니다.',
  },

  SERVER_ERROR: {
    INTERNAL_ERROR: '서버 내부 오류입니다.',
    UNAVAILABLE: '서비스를 사용할 수 없습니다.',
    UNKNOWN: '알 수 없는 오류입니다.',
    DATA_LOSS: '데이터 손실 오류입니다.',
  },
};
