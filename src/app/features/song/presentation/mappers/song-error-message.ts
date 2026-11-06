import { SongError, SongErrorCode } from '../../domain/errors/song-error';

const MESSAGES: Record<SongErrorCode, string> = {
  SPOTIFY_UNAUTHORIZED:
    'No pudimos autenticarnos con Spotify. Espera un momento e intenta de nuevo.',
  SPOTIFY_RATE_LIMITED:
    'Hiciste muchas solicitudes seguidas. Espera unos segundos y vuelve a intentar.',
  SPOTIFY_SEARCH_FAILED:
    'No pudimos buscar en Spotify. Revisa tu conexión e intenta de nuevo.',
  SPOTIFY_TRACK_FAILED:
    'No pudimos cargar la canción desde Spotify. Revisa tu conexión e intenta de nuevo.',
  SONG_NOT_FOUND:
    'No encontramos esa canción en Spotify. Vuelve a buscar e intenta de nuevo.',
  UNKNOWN: 'Ocurrió un error inesperado. Intenta de nuevo.',
};

export function toSongErrorMessage(error: unknown): string {
  return error instanceof SongError ? MESSAGES[error.code] : MESSAGES.UNKNOWN;
}
