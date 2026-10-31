import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  imports: [],
  templateUrl: './home-nav.html',
  styleUrl: './home-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-16 z-10 block' },
})
export class HomeNav {}
