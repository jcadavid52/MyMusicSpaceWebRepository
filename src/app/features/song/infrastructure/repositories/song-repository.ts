import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { SongError } from "../../domain/errors/song-error";
import {
    CreateSongRequest,
    SearchSongQuery,
    SearchSongResponse,
    SongModel,
} from "../../domain/model/song-model";
import { ISongRepository } from "../../domain/repositories/song-interface-repository";
import { SpotifyTrack } from "../services/spotify/spotify-model";
import { SpotifyService } from "../services/spotify/spotify-service";

@Injectable({ providedIn: 'root' })
export class SongRepository implements ISongRepository {
    private readonly spotifyService = inject(SpotifyService);

    create(request: CreateSongRequest): Observable<void> {
        throw new Error("Song creation is not implemented yet.");
    }

    search(query: SearchSongQuery): Observable<SearchSongResponse> {
        return this.spotifyService.search(query).pipe(
            map((response) => ({
                total: response.tracks.total,
                limit: response.tracks.limit,
                offset: response.tracks.offset,
                items: response.tracks.items.map((track) => this.toSongModel(track)),
            })),
            catchError((error: unknown) => throwError(() => this.mapError(error))),
        );
    }

    private mapError(error: unknown): SongError {
        if (error instanceof SongError) {
            return error;
        }

        if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
                return new SongError('SPOTIFY_UNAUTHORIZED', error);
            }

            if (error.status === 429) {
                return new SongError('SPOTIFY_RATE_LIMITED', error);
            }

            return new SongError('SPOTIFY_SEARCH_FAILED', error);
        }

        return new SongError('UNKNOWN', error);
    }

    private toSongModel(track: SpotifyTrack): SongModel {
        return {
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            album: {
                name: track.album.name,
                imageUrl: track.album.images[0]?.url ?? null,
            },
            durationMs: track.duration_ms,
            previewUrl: track.preview_url ?? null,
            spotifyUrl: track.external_urls.spotify,
            uri: track.uri,
        };
    }
}
