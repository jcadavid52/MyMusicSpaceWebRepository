import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCOUNT_REPOSITORY } from '../../../domain/repositories/account-repository';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
    private readonly accountRepository = inject(ACCOUNT_REPOSITORY);

    execute(): Observable<void> {
        return this.accountRepository.register()
    }
}
