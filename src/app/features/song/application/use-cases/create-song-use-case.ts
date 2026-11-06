import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateSongRequest } from "../../domain/model/song-model";
import { SONG_REPOSITORY } from "../../domain/repositories/song-interface-repository";

@Injectable({ providedIn: 'root' })
export class CreateSongUseCase {
    private readonly songRepository = inject(SONG_REPOSITORY);

    execute(request: CreateSongRequest): Observable<void> {
        return this.songRepository.create(request);
    }
}
