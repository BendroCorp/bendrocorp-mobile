import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { ErrorService } from './error.service';
import { Globals } from '../globals';
import { Job, Division } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http:HttpClient, private messageService:MessageService, private errorService:ErrorService, private globals:Globals) { }

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData()
  {
    console.log("Jobs service data refresh called!");    
    this.dataRefreshSource.next();
  }

  list() : Observable<Job[]>
  {
    return this.http.get<Job[]>(`${this.globals.baseUrl}/job`).pipe(
      tap(results => console.log(`Fetched ${results.length} jobs`)),
      catchError(this.errorService.handleError('Fetch Jobs', []))
    )
  }

  listDivisions() : Observable<Division[]> {
    return this.http.get<Division[]>(`${this.globals.baseUrl}/division`).pipe(
      tap(results => console.log(`Fetched ${results.length} divisions`)),
      catchError(this.errorService.handleError('Fetch Jobs', []))
    )
  }

  create(job: Job) :  Observable<Job> {
    return this.http.post<Job>(`${this.globals.baseUrl}/job`, { job }).pipe(
      tap(results => console.log(`Created job with id # ${results.id}`)),
      catchError(this.errorService.handleError('Fetch Jobs'))
    )
  }

  update(job: Job) :  Observable<Job> {
    return this.http.put<Job>(`${this.globals.baseUrl}/job`, { job }).pipe(
      tap(results => console.log(`Created job with id # ${results.id}`)),
      catchError(this.errorService.handleError('Fetch Jobs'))
    )
  }
}
