import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SongModel } from "../../domain/model/song-model";
import { SONG_REPOSITORY } from "../../domain/repositories/song-interface-repository";

@Injectable({ providedIn: 'root' })
export class GetSongUseCase {
    private readonly songRepository = inject(SONG_REPOSITORY);

    execute(spotifyId: string): Observable<SongModel> {
        return this.songRepository.getById(spotifyId);
    }
}
