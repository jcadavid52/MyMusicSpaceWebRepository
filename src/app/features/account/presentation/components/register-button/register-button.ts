import { ChangeDetectionStrategy, Component, DestroyRef, DOCUMENT, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterUseCase } from '../../../application/use-cases/account/register-use-case';
import { AccountError } from '../../../domain/errors/account-error';
import { toAccountErrorMessage } from '../../mappers/account-error-message';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'app-register-button',
  imports: [],
  templateUrl: './register-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
})
export class RegisterButton {

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

  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected onRegister(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.registerUseCase
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.loading.set(false),
        error: (error: unknown) => {
          this.loading.set(false);
          this.errorMessage.set(
            toAccountErrorMessage(error instanceof AccountError ? error.code : 'UNKNOWN'),
          );
        },
      });
  }

  protected dismissError(): void {
    this.errorMessage.set(null);
  }
}
