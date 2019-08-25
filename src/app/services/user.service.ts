// /user/approvals-count

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Globals } from '../globals';
import { StatusMessage } from '../models/misc.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private errorService: ErrorService, private globals: Globals) { }

  private approvalsDataRefreshSource = new Subject();
  approvalsDataRefreshAnnounced$ = this.approvalsDataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData() {
    console.log('Approvals data refresh called!');
    this.approvalsDataRefreshSource.next();
  }

  fetchPendingApprovalsCount(): Observable<number> {
    return this.http.get<number>(`${this.globals.baseUrl}/user/approvals-count`).pipe(
      tap(result => console.log(`You have ${result} pending approvals!`)),
      catchError(this.errorService.handleError<any>('Fetch Job Board'))
    );
  }

  fetchTotalApprovalCount(): Observable<number> {
    return this.http.get<number>(`${this.globals.baseUrl}/user/approvals-count-total`).pipe(
      tap(result => console.log(`You have ${result} total approvals!`)),
      catchError(this.errorService.handleError<any>('Fetch Job Board'))
    );
  }

  registerForPushNotifications(token: string, user_device_type_id: 1|2|3, reg_data: string) {
    const push_token = { token, user_device_type_id, reg_data };
    return this.http.post<StatusMessage>(`${this.globals.baseUrl}/user/push-token`, { push_token }).pipe(
      tap(result => console.log(`Added push notification!`)),
      catchError(this.errorService.handleError<any>('Push Notification Registration'))
    );
  }
}
