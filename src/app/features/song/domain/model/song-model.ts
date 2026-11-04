export interface CreateSongRequest {
    // TODO: definir los campos cuando exista el endpoint de creación en el backend
}

export interface SearchSongQuery {
    search: string;
    /** Búsqueda de canciones: el mapeo actual solo soporta el tipo 'track'. */
    type: 'track';
    /** Máximo permitido por Spotify: 50. */
    limit: number;
    offset?: number;
}

export interface SearchSongResponse {
    total: number;
    limit: number;
    offset: number;
    items: SongModel[];
}

export interface SongModel {
    id: string;
    name: string;
    artists: string[];
    album: {
        name: string;
        imageUrl: string | null;
    };
    durationMs: number;
    previewUrl: string | null;
    spotifyUrl: string;
    uri: string;
}
