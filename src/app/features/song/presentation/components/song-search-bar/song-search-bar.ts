import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-song-search-bar',
  imports: [],
  templateUrl: './song-search-bar.html',
  styleUrl: './song-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SongSearchBar {
  readonly loading = input(false);
  readonly searchRequested = output<string>();

  protected readonly query = signal('');
  protected readonly canSearch = computed(
    () => this.query().trim().length > 0 && !this.loading(),
  );
  protected readonly suggestions = ['Queen', 'Soda Stereo', 'Fred again..', 'Bad Bunny'];

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query.set(target.value);
    this.emitSearch(target.value);
  }

  protected onSubmit(event: Event): void {
      event.preventDefault();
      this.emitSearch(this.query());
  }

  protected onSuggestion(term: string): void {
    this.query.set(term);
    this.emitSearch(term);
  }

  protected clear(): void {
    this.query.set('');
  }

  private emitSearch(term: string): void {
    const value = term.trim();
    if (!value || this.loading()) {
      return;
    }

    this.searchRequested.emit(value);
  }
}
