import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable, defer, switchMap } from 'rxjs';
import { IAccountRepository } from '../../domain/repositories/account-repository';
import { KeycloakService } from '../services/keycloak/keycloak-service';
import { SessionModel } from '../../domain/model/account-model';

@Injectable({ providedIn: 'root' })
export class AccountKeycloakRepository implements IAccountRepository {
  private readonly keycloakService = inject(KeycloakService);

  register(): Observable<void> {
    return this.keycloakService.callRegister();
  }

  login(): Observable<SessionModel> {
    return this.keycloakService.callLogin().pipe(
      switchMap(() => {
        const session = this.keycloakService.getSession();
        if (session) {
          return new Observable<SessionModel>((observer) => {
            observer.next(session);
            observer.complete();
          });
        } else {
          return EMPTY;
        }
      })
    );
  }

  getSession(): SessionModel | null {
    return this.keycloakService.getSession();
  }

  getStatusSession(): Observable<boolean> {
    return this.keycloakService.getStatusSession();
  }

  closeSession(): Observable<void> {
    return this.keycloakService.closeSession();
  }
}
