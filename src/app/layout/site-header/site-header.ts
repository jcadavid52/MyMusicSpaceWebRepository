import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterButton } from '../../features/account/presentation/components/register-button/register-button';

@Component({
  selector: 'app-site-header',
  imports: [RegisterButton],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-0 z-20 block' },
})
export class SiteHeader {}
