import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SongModel } from '../../../domain/model/song-model';
import { SongResultCard } from '../song-result-card/song-result-card';

@Component({
  selector: 'app-song-results-list',
  imports: [SongResultCard],
  templateUrl: './song-results-list.html',
  styleUrl: './song-results-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SongResultsList {
  readonly songs = input.required<SongModel[]>();
  readonly total = input(0);
}
