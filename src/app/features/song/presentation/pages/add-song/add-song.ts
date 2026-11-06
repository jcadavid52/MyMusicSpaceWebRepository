import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, distinctUntilChanged, map, of } from 'rxjs';
import { GetSongUseCase } from '../../../application/use-cases/get-song-use-case';
import { SongModel } from '../../../domain/model/song-model';
import { ChordImagesUploader } from '../../components/chord-images-uploader/chord-images-uploader';
import { SongDetailCard } from '../../components/song-detail-card/song-detail-card';
import { toSongErrorMessage } from '../../mappers/song-error-message';
import { ChordImageDraft, CreateSongDraft } from '../../models/song-form.model';

interface SongFormValue {
  lyrics: string;
  translation: string;
  chords: string;
}

@Component({
  selector: 'app-add-song',
  imports: [ReactiveFormsModule, RouterLink, SongDetailCard, ChordImagesUploader],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AddSong {
  private readonly route = inject(ActivatedRoute);
  private readonly getSong = inject(GetSongUseCase);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);

  private spotifyId = '';

  protected readonly song = signal<SongModel | null>(null);
  protected readonly songLoading = signal(true);
  protected readonly songError = signal<string | null>(null);
  protected readonly chordImages = signal<ChordImageDraft[]>([]);
  protected readonly submittedDraft = signal<CreateSongDraft | null>(null);
  protected readonly payloadPreview = signal<string | null>(null);

  protected readonly form = this.fb.group({
    lyrics: this.fb.control('', Validators.required),
    translation: this.fb.control(''),
    chords: this.fb.control(''),
  });

  protected readonly formValue = signal<SongFormValue>({
    lyrics: '',
    translation: '',
    chords: '',
  });

  private readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });

  protected readonly completedSections = computed(() => {
    const value = this.formValue();

    return [
      value.lyrics.trim().length > 0,
      value.translation.trim().length > 0,
      value.chords.trim().length > 0,
      this.chordImages().length > 0,
    ].filter(Boolean).length;
  });

  protected readonly canSubmit = computed(
    () => this.formStatus() === 'VALID' && this.song() !== null && !this.songLoading(),
  );

  constructor() {
    effect(() => {
      this.chordImages();
      this.payloadPreview.set(null);
    });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formValue.set(this.form.getRawValue());
        this.payloadPreview.set(null);
      });

    this.route.paramMap
      .pipe(
        map((params) => params.get('spotifyId')),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((spotifyId) => {
        if (!spotifyId) {
          this.songLoading.set(false);
          this.songError.set('No se especificó una canción.');
          return;
        }

        this.spotifyId = spotifyId;
        this.loadSong(spotifyId);
      });
  }

  protected retry(): void {
    if (this.spotifyId) {
      this.loadSong(this.spotifyId);
    }
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const song = this.song();
    if (!song) {
      return;
    }

    const value = this.form.getRawValue();
    const draft: CreateSongDraft = {
      song,
      lyrics: value.lyrics.trim(),
      translation: value.translation.trim(),
      chords: value.chords.trim(),
      chordImages: this.chordImages(),
    };

    this.submittedDraft.set(draft);
    this.payloadPreview.set(this.buildPayloadPreview(draft));
  }

  protected closePreview(): void {
    this.payloadPreview.set(null);
  }

  private loadSong(spotifyId: string): void {
    this.songLoading.set(true);
    this.songError.set(null);
    this.song.set(null);
    this.submittedDraft.set(null);
    this.payloadPreview.set(null);

    this.getSong
      .execute(spotifyId)
      .pipe(
        catchError((error: unknown) => {
          this.songError.set(toSongErrorMessage(error));
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((song) => {
        this.songLoading.set(false);

        if (song) {
          this.song.set(song);
        }
      });
  }

  private buildPayloadPreview(draft: CreateSongDraft): string {
    const { song } = draft;

    return JSON.stringify(
      {
        song: {
          spotifyId: song.id,
          name: song.name,
          artists: song.artists,
          albumName: song.album.name,
          albumImageUrl: song.album.imageUrl,
          durationMs: song.durationMs,
          previewUrl: song.previewUrl,
          spotifyUrl: song.spotifyUrl,
          uri: song.uri,
        },
        lyrics: draft.lyrics,
        translation: draft.translation,
        chords: draft.chords,
        chordImages: draft.chordImages.map((image, index) => ({
          order: index + 1,
          fileName: image.file.name,
          contentType: image.file.type,
          sizeBytes: image.file.size,
          caption: image.caption || null,
        })),
      },
      null,
      2,
    );
  }
}
