import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { CreateSongRequest, SearchSongQuery, SearchSongResponse } from "../model/song-model";

export const SONG_REPOSITORY = new InjectionToken<ISongRepository>('SONG_REPOSITORY');

export interface ISongRepository {
    create(request: CreateSongRequest): Observable<void>;
    search(query: SearchSongQuery): Observable<SearchSongResponse>;
}
