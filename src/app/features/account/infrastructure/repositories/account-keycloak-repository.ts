import { inject, Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { IAccountRepository } from '../../domain/repositories/account-repository';
import { KeycloakService } from '../services/keycloak/keycloak-service';

@Injectable({ providedIn: 'root' })
export class AccountKeycloakRepository implements IAccountRepository {

  private readonly keycloakService = inject(KeycloakService);

  register(): Observable<void> {
    return this.keycloakService.callRegister();
  }
}
