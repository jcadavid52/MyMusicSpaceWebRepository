import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export const ACCOUNT_REPOSITORY = new InjectionToken<IAccountRepository>('ACCOUNT_REPOSITORY');

export interface IAccountRepository {
    register(): Observable<void>;
}