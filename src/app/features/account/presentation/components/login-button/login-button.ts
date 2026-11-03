import { Component, DestroyRef, inject, signal,DOCUMENT } from '@angular/core';
import { LoginUseCase } from '../../../application/use-cases/account/login-use-case';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { toAccountErrorMessage } from '../../mappers/account-error-message';
import { AccountError } from '../../../domain/errors/account-error';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './login-button.html',
  styles: ``,
})
export class LoginButton {

  constructor() {
    const window = this.document.defaultView;
        if (!window) return;
    
        fromEvent<PageTransitionEvent>(window, 'pageshow')
          .pipe(
            filter((event) => event.persisted),
            takeUntilDestroyed(this.destroyRef),
          )
          .subscribe(() => this.loading.set(false));
  }

  private readonly loginUseCase = inject(LoginUseCase);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly document = inject(DOCUMENT);

  protected onLogin(): void {
    if (this.loading()) {
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);

    this.loginUseCase
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
        },
        error: (error) => {
          this.loading.set(false);
          toAccountErrorMessage(error instanceof AccountError ? error.code : 'UNKNOWN')
        }
      });

  }
}
