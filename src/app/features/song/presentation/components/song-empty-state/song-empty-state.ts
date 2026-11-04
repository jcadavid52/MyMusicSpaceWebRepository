import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-song-empty-state',
  imports: [],
  templateUrl: './song-empty-state.html',
  styleUrl: './song-empty-state.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SongEmptyState {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
