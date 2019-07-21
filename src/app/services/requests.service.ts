import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ErrorService } from './error.service';
import { Globals } from '../globals';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { tap, catchError } from '../../../node_modules/rxjs/operators';
import { AddRoleRequest, RemoveRoleRequest, PositionChangeRequest } from '../models/request.model';
import { StatusMessage } from '../models/misc.model';
import { MyApproval } from '../models/approval.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http:HttpClient, private errorService:ErrorService, private globals:Globals) { }

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData()
  {
    console.log("Requests service data refresh called!");    
    this.dataRefreshSource.next();
  }

  addRoleRequest(role_request:AddRoleRequest) : Observable<StatusMessage>
  {
    return this.http.post<StatusMessage>(`${this.globals.baseUrl}/requests/add-role`, { role_request }).pipe(
      tap(results => console.log(`Submitted Add Role Request `)),
      catchError(this.errorService.handleError<any>('Add Role Request '))
    )
  }

  removeRoleRequest(role_removal_request:RemoveRoleRequest) : Observable<StatusMessage>
  {
    return this.http.post<StatusMessage>(`${this.globals.baseUrl}/requests/remove-role`, { role_removal_request }).pipe(
      tap(results => console.log(`Submitted Remove Role Request `)),
      catchError(this.errorService.handleError<any>('Remove Role Request '))
    )
  }

  positionChangeRequest(position_change_request:PositionChangeRequest) : Observable<StatusMessage>
  {
    return this.http.post<StatusMessage>(`${this.globals.baseUrl}/requests/position-change`, { position_change_request }).pipe(
      tap(results => console.log(`Submitted Remove Role Request `)),
      catchError(this.errorService.handleError<any>('Remove Role Request '))
    )
  }

  list_approvals(count:number = null, skip: number = null) : Observable<MyApproval[]>
  {
    if (count && !isNaN(count)) {
      if (skip && !isNaN(skip)) {
        return this.http.get<MyApproval[]>(`${this.globals.baseUrl}/user/approvals/${count}/${skip}`).pipe(
          tap(results => console.log(`Retrieved approvals`)),
          catchError(this.errorService.handleError('Fetch User Approvals', []))
        )
      } else {
        return this.http.get<MyApproval[]>(`${this.globals.baseUrl}/user/approvals/${count}`).pipe(
          tap(results => console.log(`Retrieved approvals`)),
          catchError(this.errorService.handleError('Fetch User Approvals', []))
        )
      }
    } else {
      return this.http.get<MyApproval[]>(`${this.globals.baseUrl}/user/approvals`).pipe(
        tap(results => console.log(`Retrieved approvals`)),
        catchError(this.errorService.handleError('Fetch User Approvals', []))
      )
    }
  }

  submit_approval(approval_id:number, approval_type_id:number) : Observable<StatusMessage>
  {
    return this.http.get<StatusMessage>(`${this.globals.baseUrl}/approvals/${approval_id}/${approval_type_id}`).pipe(
      tap(results => console.log(`Submitted approval change for approval #${approval_id}`)),
      catchError(this.errorService.handleError<any>('Submit Approval'))
    )
  }
}
