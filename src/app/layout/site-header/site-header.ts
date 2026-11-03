import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterButton } from '../../features/account/presentation/components/register-button/register-button';
import { LoginButton } from '../../features/account/presentation/components/login-button/login-button';

@Component({
  selector: 'app-site-header',
  imports: [RegisterButton, LoginButton],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-0 z-20 block' },
})
export class SiteHeader {}
