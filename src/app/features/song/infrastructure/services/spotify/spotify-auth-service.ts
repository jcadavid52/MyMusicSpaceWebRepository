import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, finalize, map, Observable, of, shareReplay, tap, throwError } from "rxjs";
import { environment } from "../../../../../environments/environment-local";
import { SpotifyTokenResponse } from "./spotify-model";

@Injectable({ providedIn: 'root' })
export class SpotifyAuthService {
    private readonly http = inject(HttpClient);

    private accessToken: string | null = null;
    private expiresAt = 0;
    private tokenRequest$: Observable<string> | null = null;

    getAccessToken(): Observable<string> {
        if (this.accessToken && Date.now() < this.expiresAt) {
            return of(this.accessToken);
        }

        if (!this.tokenRequest$) {
            this.tokenRequest$ = this.requestToken().pipe(
                finalize(() => {
                    this.tokenRequest$ = null;
                }),
                shareReplay({ bufferSize: 1, refCount: false }),
            );
        }

        return this.tokenRequest$;
    }

    invalidateToken(): void {
        this.accessToken = null;
        this.expiresAt = 0;
        this.tokenRequest$ = null;
    }

    private requestToken(): Observable<string> {
        const credentials = btoa(
            `${environment.spotify.clientId}:${environment.spotify.clientSecret}`,
        );

        const headers = new HttpHeaders({
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        const body = new HttpParams().set('grant_type', 'client_credentials').toString();

        return this.http
            .post<SpotifyTokenResponse>(environment.spotify.authUrl, body, { headers })
            .pipe(
                tap((response) => {
                    this.accessToken = response.access_token;
                    this.expiresAt = Date.now() + Math.max(response.expires_in - 60, 0) * 1000;
                }),
                map((response) => response.access_token),
                catchError((error: unknown) => {
                    this.invalidateToken();
                    return throwError(() => error);
                }),
            );
    }
}
