import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ErrorService } from './error.service';
import { Subject, Observable } from '../../../node_modules/rxjs';
import {
  CharacterApplication,
  CharacterApplicationComment,
  Character,
  CharacterApplicationInterview,
  NewCharacterApplication
} from '../models/character.model';
import { StatusMessage } from '../models/misc.model';
import { tap, catchError } from '../../../node_modules/rxjs/operators';
import { MessageService } from './message.service';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private messageService: MessageService,
    private globals: Globals
  ) { }

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData() {
    console.log("Requests service data refresh called!");
    this.dataRefreshSource.next();
  }

  createApplication(character: NewCharacterApplication): Observable<CharacterApplication> {
    return this.http.post<CharacterApplication>(`${this.globals.baseUrl}/apply`, { character }).pipe(
      tap(results => console.log("Advanced application status!")),
      catchError(this.errorService.handleError<any>('Create Application'))
    );
  }

  fetchApplication(): Observable<CharacterApplication> {
    return this.http.get<CharacterApplication>(`${this.globals.baseUrl}/apply`).pipe(
      tap(results => console.log("Advanced application status!")),
      catchError(this.errorService.handleError<any>('Fetch Application'))
    );
  }

  advanceApplication(character: Character): Observable<StatusMessage> {
    return this.http.get<StatusMessage>(`${this.globals.baseUrl}/apply/${character.id}/advance`).pipe(
      tap(results => console.log("Advanced application status!")),
      catchError(this.errorService.handleError<any>('Advance Application'))
    );
  }

  rejectApplication(character: Character): Observable<StatusMessage> {
    return this.http.post<StatusMessage>(`${this.globals.baseUrl}/apply/reject`, { character }).pipe(
      tap(results => console.log("Advanced application status!")),
      catchError(this.errorService.handleError<any>('Advance Application'))
    );
  }

  updateInterview(interview: CharacterApplicationInterview) : Observable<CharacterApplicationInterview> {
    return this.http.patch<CharacterApplicationInterview>(`${this.globals.baseUrl}/apply`, { interview }).pipe(
      tap(results => console.log("Updated application interview!")),
      catchError(this.errorService.handleError<any>('Update Interview'))
    );
  }

  addApplicationComment(application_comment: CharacterApplicationComment): Observable<CharacterApplicationComment> {
    return this.http.post<CharacterApplicationComment>(`${this.globals.baseUrl}/profile/comment`, { application_comment }).pipe(
      tap(results => console.log("Created application comment!")),
      catchError(this.errorService.handleError<any>('Application Comment'))
    );
  }
}
