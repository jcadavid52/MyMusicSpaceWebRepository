import { inject, Injectable } from "@angular/core";
import { ACCOUNT_REPOSITORY } from "../../../domain/repositories/account-repository";

@Injectable({ providedIn: 'root' })
export class GetSessionUseCase {
    private readonly accountRepository = inject(ACCOUNT_REPOSITORY);

    execute() {
        return this.accountRepository.getSession();
    }
}