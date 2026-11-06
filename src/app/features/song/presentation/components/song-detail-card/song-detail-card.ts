import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SongModel } from '../../../domain/model/song-model';
import { DurationPipe } from '../../../../../shared/pipes/duration-pipe';

@Component({
  selector: 'app-song-detail-card',
  imports: [DurationPipe],
  templateUrl: './song-detail-card.html',
  styleUrl: './song-detail-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class SongDetailCard {
  readonly song = input.required<SongModel>();
}
