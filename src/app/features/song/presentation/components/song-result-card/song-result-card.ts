import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SongModel } from '../../../domain/model/song-model';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-song-result-card',
  imports: [DurationPipe,RouterLink],
  templateUrl: './song-result-card.html',
  styleUrl: './song-result-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SongResultCard {
  readonly song = input.required<SongModel>();
}
