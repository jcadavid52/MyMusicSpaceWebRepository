import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RegisterButton } from '../../features/account/presentation/components/register-button/register-button';
import { LoginButton } from '../../features/account/presentation/components/login-button/login-button';
import { GetStatusSessionUseCase } from '../../features/account/application/use-cases/account/get-status-session';
import { GetSessionUseCase } from '../../features/account/application/use-cases/account/get-session-use-case';
import { CloseSessionButton } from '../../features/account/presentation/components/close-session-button/close-session-button';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AccountError } from '../../features/account/domain/errors/account-error';
import { SessionModel } from '../../features/account/domain/model/account-model';

@Component({
  selector: 'app-site-header',
  imports: [RegisterButton, LoginButton, CloseSessionButton],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sticky top-0 z-20 block' },
})
export class SiteHeader {

  protected readonly statusSessionUseCase = inject(GetStatusSessionUseCase);
  protected readonly getSessionUseCase = inject(GetSessionUseCase);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  protected isLoggedIn = signal<boolean>(false);
  protected session = signal<SessionModel | null>(this.getSessionUseCase.execute());

  constructor() {
    this.getStatusSession();
  }

  private getStatusSession(): void {
    this.statusSessionUseCase
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (status) => {
          this.isLoggedIn.set(status);
        },
        error: (error) => {
          this.errorMessage.set(`Error al obtener el estado de la sesión: ${error instanceof AccountError ? error.message : 'Error desconocido'}`);
        }
      });
  }
}
