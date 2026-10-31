import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-site-header',
  imports: [],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-0 z-20 block' },
})
export class SiteHeader {}
