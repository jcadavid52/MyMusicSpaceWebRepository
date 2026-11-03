import { Component, inject, signal } from '@angular/core';
import { CloseSessionUseCase } from '../../../application/use-cases/account/close-session';
import { toAccountErrorMessage } from '../../mappers/account-error-message';
import { AccountError } from '../../../domain/errors/account-error';

@Component({
  selector: 'app-close-session-button',
  imports: [],
  templateUrl: './close-session-button.html',
  styles: ``,
})
export class CloseSessionButton {
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly closeSessionUseCase = inject(CloseSessionUseCase);

  protected onLogout(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.closeSessionUseCase
      .execute()
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
