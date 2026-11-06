import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment-local";
import { SpotifyAuthService } from "../../features/song/infrastructure/services/spotify/spotify-auth-service";

export const spotifyAuthInterceptor: HttpInterceptorFn = (request, next) => {
    if (!request.url.startsWith(environment.spotify.apiUrl)) {
        return next(request);
    }

    const authService = inject(SpotifyAuthService);

    const withToken = (token: string) =>
        next(
            request.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
            }),
        );

    return authService.getAccessToken().pipe(
        switchMap(withToken),
        catchError((error: unknown) => {
            // El token pudo expirar o ser revocado: se invalida y se reintenta una sola vez.
            if (error instanceof HttpErrorResponse && error.status === 401) {
                authService.invalidateToken();
                return authService.getAccessToken().pipe(switchMap(withToken));
            }

            return throwError(() => error);
        }),
    );
};
