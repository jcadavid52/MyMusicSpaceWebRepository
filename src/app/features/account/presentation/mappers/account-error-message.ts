import { AccountErrorCode } from '../../domain/errors/account-error';

const ACCOUNT_ERROR_MESSAGES: Record<AccountErrorCode, string> = {
  KEYCLOAK_NOT_INITIALIZED:
    'El servicio de cuentas todavía no está disponible. Recarga la página e inténtalo de nuevo.',
  KEYCLOAK_UNREACHABLE:
    'No pudimos conectar con el servicio de cuentas. Revisa tu conexión e inténtalo de nuevo.',
  REGISTRATION_FAILED: 'No se pudo iniciar el registro. Inténtalo de nuevo en unos segundos.',
  AUTH_CALLBACK_ERROR: 'No se pudo completar la autenticación. Inténtalo de nuevo.',
  UNKNOWN: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
};

export function toAccountErrorMessage(code: AccountErrorCode): string {
  return ACCOUNT_ERROR_MESSAGES[code];
}
