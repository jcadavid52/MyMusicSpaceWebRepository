import { inject, Injectable } from "@angular/core";
import { ACCOUNT_REPOSITORY } from "../../../domain/repositories/account-repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
    private accountRepository = inject(ACCOUNT_REPOSITORY);

    execute(): Observable<void> {
        return this.accountRepository.register();
    }
}