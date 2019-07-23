import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // https://stackoverflow.com/questions/47369850/property-get-does-not-exist-on-type-httpclientmodule
import * as moment from 'moment';
import { tap, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
// import 'rxjs/add/observable/of'; // https://stackoverflow.com/questions/36568388/observable-of-is-not-a-function
import { Subject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
// import { StatusMessage } from './models/misc-models';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Globals } from '../globals';
import { MessageService } from './message.service';
import { UserSessionResponse, IdTokenResponse } from '../models/user.model';

@Injectable()
export class AuthService {
  // https://www.metaltoad.com/blog/angular-5-making-api-calls-httpclient-service
  // https://blog.angular-university.io/angular-jwt-authentication/
  constructor(public http: HttpClient,
    public messageService: MessageService,
    public err: ErrorService,
    public globals: Globals,
    public router: Router) { }

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  refreshData() {
    console.log('Auth service data refresh called!');
    this.dataRefreshSource.next();
  }

  /** Log the user in. */
  login(email: string, password: string, code?: string): Observable<IdTokenResponse> {
    const device = 'Mobile';
    const session = { 'session': { email, password, code, device } }
    
    return this.http.post<IdTokenResponse>(`${this.globals.baseUrlRoot}auth`, session).pipe(
      tap(result => {
        this.messageService.toast('Login Successful! Welcome back!')
      }),
      catchError(this.err.handleError<any>('Login'))
    );
  }

  // signup(signup: SignUp) {
  //   return this.http.post<StatusMessage>(`${this.globals.baseUrl}/signup`, { signup }).pipe(
  //     tap(result => console.log('New sign up created!')),
  //     catchError(this.err.handleError<any>('Sign Up'))
  //   )
  // }

  // changePassword(password: NewPassword) {
  //   return this.http.post<StatusMessage>(`${this.globals.baseUrl}/account/change-password`, { password }).pipe(
  //     tap(result => console.log('Password updated!')),
  //     catchError(this.err.handleError<any>('Update Password'))
  //   )
  // }

  // fetchTfa(): Observable <TwoFactorDataObject> {
  //   return this.http.get<TwoFactorDataObject>(`${this.globals.baseUrl}/account/fetch-tfa`).pipe(
  //     tap(result => console.log('Fetch TFA!')),
  //     catchError(this.err.handleError<any>('Fetch TFA'))
  //   )
  // }

  // enableTfa(two_factor_auth: TwoFactorAuthObject): Observable <StatusMessage> {
  //   return this.http.post<StatusMessage>(`${this.globals.baseUrl}/account/enable-tfa`, { two_factor_auth }).pipe(
  //     tap(result => console.log('Enable TFA!')),
  //     catchError(this.err.handleError<any>('Enable TFA'))
  //   )
  // }

  // fetchAuthTokens(): Observable<TokenObject[]> {
  //   return this.http.get<TokenObject[]>(`${this.globals.baseUrl}/user/auth-tokens`).pipe(
  //     tap(result => console.log(`Fetched ${result.length} tokens`)),
  //     catchError(this.err.handleError<any>('Retrieve Auth Tokens'))
  //   )
  // }

  // removeAuthToken(token: string): Observable<StatusMessage> {
  //   return this.http.delete<StatusMessage>(`${this.globals.baseUrl}/account/token/${token}`).pipe(
  //     tap(result => console.log('Removed auth token!')),
  //     catchError(this.err.handleError<any>('Remove Auth Token'))
  //   )
  // }

  // requestPasswordReset(email: string): Observable<StatusMessage> {
  //   const user = { email: email }
  //   return this.http.post<StatusMessage>(`${this.globals.baseUrl}/account/forgot-password`, { user }).pipe(
  //     tap(result => console.log('Requested password reset!')),
  //     catchError(this.err.handleError<any>('Request Password Reset'))
  //   )
  // }

  // doPasswordReset(password: string, password_confirmation: string, password_reset_token: string): Observable<StatusMessage> {
  //   const user = { password, password_confirmation, password_reset_token }
  //   return this.http.post<StatusMessage>(`${this.globals.baseUrl}/account/reset-password`, { user }).pipe(
  //     tap(result => console.log('Password reset!')),
  //     catchError(this.err.handleError<any>('Password Reset'))
  //   )
  // }

  // doUpdateEmail(email: string, password: string): Observable<StatusMessage> {
  //   return this.http.post<StatusMessage>(`${this.globals.baseUrl}/account/update-email`, { email, password }).pipe(
  //     tap(result => console.log('Email updated!')),
  //     catchError(this.err.handleError<any>('Email Update'))
  //   )
  // }
 
  // Internal stuff below here

  public hasClaim(roleId: number): boolean {
    if (this.isLoggedIn()) {
      if ((this.retrieveUserSession() as UserSessionResponse).roles.length > 0) {
        const roles = (this.retrieveUserSession() as UserSessionResponse).roles;
        const claim = roles.find(x => x === roleId)
        if (claim == roleId) {
          return true
        }
      }
      return false
    } else {
      return false
    }
  }

  setSession(authResult: string): Observable<boolean> {
    if (authResult !== 'undefined') {
      localStorage.setItem('userObject', authResult);
      return of(true)
    } else {
      console.error('Undefined authResult passed to setSession!');
      return of(false)
    }
  }
  /**
   * Retrieve the current JWT token string
   * @returns Session JWT Token
   */
  retrieveSession(): string {
    const encodedJwt = localStorage.getItem('userObject');
    if (encodedJwt) {
      const results = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+\/=]*$/.test(encodedJwt)
      if (results) {
        return encodedJwt
      } else {
        this.logout();
      }
    }
  }

  /**
   * Remove the user token from the store (ie log the user out)
   */
  logout(): Observable<boolean> {
    // let didLogout = localStorage.removeItem('userObject') ? of(true) : of(false);
    // return didLogout
    localStorage.removeItem('userObject')
    return of(true)
  }

  public isLoggedIn() {
    if (this.retrieveUserSession()) {
      const notExpired = moment().isBefore(this.getExpiration());
      return notExpired;
    } else {
      // this.logout();
      return false;
    }
  }

  setOnAuthRedirect(uri: string) {
    localStorage.setItem('authRedirect', uri)
  }

  unSetOnAuthRedirect() {
    localStorage.removeItem('authRedirect')
  }

  getOnAuthRedirect(): string {
    return localStorage.getItem('authRedirect')
  }

  /**
   * Fetch the user information from the stored JWT token
   * @returns User parsed from JWT token
   */
  retrieveUserSession(): UserSessionResponse {
    const session = this.retrieveSession();
    if (session) {
      const jwtHelper = new JwtHelperService()
      const decodedToken = jwtHelper.decodeToken(session)

      return { 
        id: decodedToken.sub, 
        roles: decodedToken.roles, 
        first_name: decodedToken.given_name, 
        last_name: decodedToken.family_name, 
        avatar: decodedToken.avatar,
        expires: decodedToken.exp,
        tfa_enabled: decodedToken.tfa_enabled,
        character_id: decodedToken.character_id,
        job_title: decodedToken.job_title
      } as UserSessionResponse;
    }
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const userObject = this.retrieveUserSession();
      return moment.unix(userObject.expires);
  }

}
