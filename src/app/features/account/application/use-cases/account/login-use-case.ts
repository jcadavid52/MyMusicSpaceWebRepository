import {ACCOUNT_REPOSITORY, IAccountRepository} from "../../../domain/repositories/account-repository";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SessionModel} from "../../../domain/model/account-model";

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
    private readonly accountRepository = inject(ACCOUNT_REPOSITORY);

    execute(): Observable<SessionModel> {
        return this.accountRepository.login();
    }
}