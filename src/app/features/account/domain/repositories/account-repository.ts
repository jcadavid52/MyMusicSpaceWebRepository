import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { SessionModel } from "../model/account-model";

export const ACCOUNT_REPOSITORY = new InjectionToken<IAccountRepository>('ACCOUNT_REPOSITORY');

export interface IAccountRepository {
    register(): Observable<void>;
    login(): Observable<SessionModel>;
    getSession(): SessionModel | null;
    getStatusSession(): Observable<boolean>;
    closeSession(): Observable<void>;
}