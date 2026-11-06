import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchSongQuery, SearchSongResponse } from "../../domain/model/song-model";
import { SONG_REPOSITORY } from "../../domain/repositories/song-interface-repository";

@Injectable({ providedIn: 'root' })
export class SearchSongUseCase {
    private readonly songRepository = inject(SONG_REPOSITORY);

    execute(query: SearchSongQuery): Observable<SearchSongResponse> {
        return this.songRepository.search(query);
    }
}
