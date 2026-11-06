export type SongErrorCode =
  | 'SPOTIFY_UNAUTHORIZED'
  | 'SPOTIFY_RATE_LIMITED'
  | 'SPOTIFY_SEARCH_FAILED'
  | 'SPOTIFY_TRACK_FAILED'
  | 'SONG_NOT_FOUND'
  | 'UNKNOWN';

export class SongError extends Error {
  constructor(
    readonly code: SongErrorCode,
    readonly originalError?: unknown,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'SongError';
  }
}
