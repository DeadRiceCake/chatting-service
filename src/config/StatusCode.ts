export const RESPONSE_CODE = {
  SUCCESS: {
    OK: 200,
    CREATED: 201,
  },

  REDIRECTION: {
    MULTIPLE_CHOICE: 300,
  },

  CLIENT_ERROR: {
    INVALID_ARGUMENT: 400,
    FAILED_PRECONDITION: 400,
    UNAUTHENTICATED: 401,
    NOT_FOUND: 404,
  },

  SERVER_ERROR: {
    INTERNAL: 500,
  },
};
