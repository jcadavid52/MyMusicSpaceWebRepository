import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooter } from '../site-footer/site-footer';
import { SiteHeader } from '../site-header/site-header';

@Component({
  selector: 'app-site-layout',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './site-layout.html',
  styleUrl: './site-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'isolate flex min-h-screen flex-col bg-slate-950 text-slate-200 antialiased selection:bg-violet-500/30 selection:text-white',
  },
})
export class SiteLayout {}
