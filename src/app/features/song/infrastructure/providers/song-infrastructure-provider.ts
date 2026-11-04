import { Provider } from "@angular/core";
import { SONG_REPOSITORY } from "../../domain/repositories/song-interface-repository";
import { SongRepository } from "../repositories/song-repository";

export const songInfrastructureProviders: Provider[] = [
    {
        provide: SONG_REPOSITORY,
        useClass: SongRepository,
    },
];
