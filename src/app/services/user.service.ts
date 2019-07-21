// /user/approvals-count

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private errorService: ErrorService, private globals: Globals) { }

  fetchPendingApprovalsCount(): Observable<number>
  {
    return this.http.get<number>(`${this.globals.baseUrl}/user/approvals-count`).pipe(
      tap(result => console.log(`You have ${result} pending approvals!`)),
      catchError(this.errorService.handleError<any>('Fetch Job Board'))
    )
  }

  fetchTotalApprovalCount(): Observable<number>
  {
    return this.http.get<number>(`${this.globals.baseUrl}/user/approvals-count-total`).pipe(
      tap(result => console.log(`You have ${result} total approvals!`)),
      catchError(this.errorService.handleError<any>('Fetch Job Board'))
    )
  }
}
