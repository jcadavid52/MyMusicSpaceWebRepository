import { inject, Injectable } from "@angular/core";
import { ACCOUNT_REPOSITORY } from "../../../domain/repositories/account-repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetStatusSessionUseCase {
    private readonly accountRepository = inject(ACCOUNT_REPOSITORY);
    execute(): Observable<boolean> {
        return this.accountRepository.getStatusSession();
    }
}