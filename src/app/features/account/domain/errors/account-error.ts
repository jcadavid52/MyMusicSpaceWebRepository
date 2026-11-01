export type AccountErrorCode =
  | 'KEYCLOAK_NOT_INITIALIZED'
  | 'KEYCLOAK_UNREACHABLE'
  | 'REGISTRATION_FAILED'
  | 'AUTH_CALLBACK_ERROR'
  | 'UNKNOWN';

export class AccountError extends Error {
  constructor(
    readonly code: AccountErrorCode,
    readonly originalError?: unknown,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'AccountError';
  }
}
