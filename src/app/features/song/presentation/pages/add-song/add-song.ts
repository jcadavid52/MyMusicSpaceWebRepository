import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap, tap } from 'rxjs';
import { SearchSongUseCase } from '../../../application/use-cases/search-song-use-case';
import { SongModel } from '../../../domain/model/song-model';
import { SongEmptyState } from '../../components/song-empty-state/song-empty-state';
import { SongResultsList } from '../../components/song-results-list/song-results-list';
import { SongSearchBar } from '../../components/song-search-bar/song-search-bar';
import { toSongErrorMessage } from '../../mappers/song-error-message';

@Component({
  selector: 'app-add-song',
  imports: [SongSearchBar, SongResultsList, SongEmptyState],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class AddSong {
  private readonly searchSong = inject(SearchSongUseCase);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchTerms = new Subject<string>();

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly songs = signal<SongModel[]>([]);
  protected readonly total = signal(0);
  protected readonly lastQuery = signal('');
  protected readonly hasSearched = signal(false);

  constructor() {
    this.searchTerms
      .pipe(
        tap((term) => {
          this.loading.set(true);
          this.errorMessage.set(null);
          this.lastQuery.set(term);
          this.songs.set([]);
          this.total.set(0);
        }),
        switchMap((term) =>
          this.searchSong.execute({ search: term, type: 'track', limit: 10 }).pipe(
            catchError((error: unknown) => {
              this.errorMessage.set(toSongErrorMessage(error));
              return of(null);
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        this.loading.set(false);
        this.hasSearched.set(true);
        if (response) {
          this.songs.set(response.items);
          this.total.set(response.total);
        }
      });
  }

  protected onSearch(term: string): void {
    this.searchTerms.next(term);
  }
}
