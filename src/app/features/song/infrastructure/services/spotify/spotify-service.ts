import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment-local";
import { SearchSongQuery } from "../../../domain/model/song-model";
import { SpotifySearchResponse } from "./spotify-model";

@Injectable({ providedIn: 'root' })
export class SpotifyService {
    private readonly http = inject(HttpClient);

    search(query: SearchSongQuery): Observable<SpotifySearchResponse> {
        const params = new HttpParams()
            .set('q', query.search)
            .set('type', query.type)
            .set('limit', query.limit)
            .set('offset', query.offset ?? 0);

        return this.http.get<SpotifySearchResponse>(
            `${environment.spotify.apiUrl}/v1/search`,
            { params },
        );
    }
}
