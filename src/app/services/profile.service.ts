import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ErrorService } from './error.service';
import { Globals } from '../globals';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { Character, Division, Job } from '../models/character.model';
import { tap, catchError } from '../../../node_modules/rxjs/operators';
import { StatusMessage } from '../models/misc.model';
import { OwnedShip, Ship } from '../models/ship.models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient, private errorService:ErrorService, private globals:Globals) { }

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData()
  {
    console.log("Profile service data refresh called!");    
    this.dataRefreshSource.next();
  }

  list() : Observable<Character[]>
  {
    return this.http.get<Character[]>(`${this.globals.baseUrl}/profile`).pipe(
      tap(result => console.log(`Fetched ${result.length} profiles!`)),
      catchError(this.errorService.handleError('Fetch Profiles', []))
    )
  }

  list_by_division() : Observable<Division[]>
  {
    return this.http.get<Division[]>(`${this.globals.baseUrl}/profile/by-division`).pipe(
      tap(result => console.log(`Fetched ${result.length} profiles!`)),
      catchError(this.errorService.handleError('Fetch Profiles', []))
    )
  }

  fetch(profile_id:number) : Observable<Character>
  {
    return this.http.get<Character>(`${this.globals.baseUrl}/profile/${profile_id}`).pipe(
      tap(result => console.log(`Fetched profile id #${profile_id}!`)),
      catchError(this.errorService.handleError<any>('Fetch Profiles'))
    )
  }

  update(character:Character) : Observable<StatusMessage>
  {
    return this.http.patch<StatusMessage>(`${this.globals.baseUrl}/profile`, { character }).pipe(
      tap(result => console.log(`Updated profile id #${character.id}!`)),
      catchError(this.errorService.handleError<any>('Update Profile'))
    )
  }

  updateAvatar(character:Character) : Observable<StatusMessage>
  {
    return this.http.patch<StatusMessage>(`${this.globals.baseUrl}/profile/avatar`, { character }).pipe(
      tap(result => console.log(`Updated profile id #${character.id}!`)),
      catchError(this.errorService.handleError<any>('Update Profile'))
    )
  }

  updateHandle(characterId:number, handle:string) : Observable<StatusMessage>
  {
    let character = { id: characterId, handle }
    return this.http.patch<StatusMessage>(`${this.globals.baseUrl}/profile/handle`, { character }).pipe(
      tap(result => console.log(`Updated profile id #${character.id}!`)),
      catchError(this.errorService.handleError<any>('Update Profile'))
    )
  }

  addShip(owned_ship:OwnedShip) : Observable<OwnedShip>
  {
    return this.http.post<OwnedShip>(`${this.globals.baseUrl}/profile/ship`, { owned_ship }).pipe(
      tap(result => console.log(`Created owned ship id #${result.id}!`)),
      catchError(this.errorService.handleError<any>('Update Profile'))
    )
  }

  removeShip(owned_ship:OwnedShip) : Observable<StatusMessage>
  {
    return this.http.delete<OwnedShip>(`${this.globals.baseUrl}/profile/ship/${owned_ship.id}`).pipe(
      tap(result => console.log(`Archived owned ship id #${owned_ship.id}!`)),
      catchError(this.errorService.handleError<any>('Update Profile'))
    )
  }

  /**
   * List all available classes of ships
   */
  list_ships() : Observable<Ship[]>
  {
    return this.http.get<Ship[]>(`${this.globals.baseUrl}/ship`).pipe(
      tap(result => console.log(`Fetched all ships`)),
      catchError(this.errorService.handleError('Fetch Ships', []))
    )
  }

  list_jobs() : Observable<Job[]>
  {
    return this.http.get<Job[]>(`${this.globals.baseUrl}/job`).pipe(
      tap(result => console.log(`Fetched all jobs`)),
      catchError(this.errorService.handleError('Fetch Jobs', []))
    )
  }

  list_hiring_jobs() : Observable<Job[]>
  {
    return this.http.get<Job[]>(`${this.globals.baseUrl}/job/hiring`).pipe(
      tap(result => console.log(`Fetched all hiring jobs`)),
      catchError(this.errorService.handleError('Fetch Hiring Jobs', []))
    )
  }

}
