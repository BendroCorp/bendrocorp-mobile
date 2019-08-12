import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';
import { Platform } from '@ionic/angular';
import { StoredToken } from './models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    constructor(
        private authService: AuthService,
        private router: Router,
        private errorService: ErrorService,
        private secureStorage: SecureStorage,
        private platform: Platform
    ){ }

    httpEventSubscription: Subscription;

     /**
     * manage errors
     * @param err
     * @returns {any}
     */
    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401) {
        // navigate /delete cookies or whatever
        console.log('handled error ' + err.status);
        this.authService.logout();
        this.authService.setOnAuthRedirect(err.url);
        this.authService.refreshData();
        this.router.navigateByUrl(`/auth`);
        // yes we do want to let downstream stuff also have a day lol man
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        // return of(err.message);
        }
        return of(err);
    }

    intercept(request: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        // Retrieve the token from the userObject
        if (this.authService.isLoggedIn()) {
            const token = this.authService.retrieveSession();

            // console.log(`Logged in adding token to request: ${token}`);

            const cloned = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });

            // https://stackoverflow.com/questions/50970446/http-error-handling-in-angular-6
            // https://www.coditty.com/code/angular-6-interceptor-response-example - not sure if this is helpful or not...
            return next.handle(cloned);

        } else {
            if (this.platform.is('cordova')) {
                this.secureStorage.create('bendrocorp').then((storageObject) => {
                    storageObject.get('loginStore').then((valueResult) => {
                        if (valueResult) {
                            const refreshToken = JSON.parse(valueResult) as StoredToken;
                            this.authService.refreshLogin(refreshToken).subscribe((results) => {
                                const cloned = request.clone({
                                    headers: request.headers.set('Authorization', `Bearer ${refreshToken}`)
                                });
                                return next.handle(cloned);
                            });
                        } else { // there was not stored refresh_token
                            // remove the stored item
                            storageObject.remove('loginStore').then(() => {});
                            return next.handle(request);
                        }
                    }).catch(() => { // failed to get login store
                        // remove the stored item
                        storageObject.remove('loginStore').then(() => {});
                        return next.handle(request);
                    });
                }).catch(() => { // SecureStorage doesn't work here
                    return next.handle(request);
                });
            } else { // this is not Cordova so ¯\_(ツ)_/¯
                return next.handle(request);
            }
        }
    }
}
