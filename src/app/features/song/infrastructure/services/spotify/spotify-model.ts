// DTOs de la API de Spotify (https://developer.spotify.com/documentation/web-api)
export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface SpotifyExternalUrls {
    spotify: string;
}

export interface SpotifyExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
}

export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifyAlbum {
    album_type: string;
    artists: SpotifyArtist[];
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    is_playable?: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids?: SpotifyExternalIds;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable?: boolean;
    name: string;
    preview_url?: string | null;
    track_number: number;
    type: string;
    uri: string;
}

export interface SpotifyPaging<T> {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface SpotifySearchResponse {
    tracks: SpotifyPaging<SpotifyTrack>;
}
