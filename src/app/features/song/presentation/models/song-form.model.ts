import { SongModel } from '../../domain/model/song-model';

export interface ChordImageDraft {
  id: string;
  file: File;
  previewUrl: string;
  caption: string;
}

/** Modelo local de presentación. Se mapeará a CreateSongRequest al conectar el backend. */
export interface CreateSongDraft {
  song: SongModel;
  lyrics: string;
  translation: string;
  chords: string;
  chordImages: ChordImageDraft[];
}
