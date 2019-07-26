import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Globals } from '../globals';
import { Subject, Observable } from 'rxjs';
import { OwnedShip } from '../models/ship.models';
import { FlightLog } from '../models/flight-log.model';
import { catchError, tap } from 'rxjs/operators';
import { StatusMessage } from '../models/misc.model';

@Injectable({
  providedIn: 'root'
})
export class FlightLogService {

  constructor(private http: HttpClient, private errorService: ErrorService, private globals: Globals) { }

  private passedData = {} as FlightLog;
  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData() {
    console.log('Flight log service data refresh called!');
    this.dataRefreshSource.next();
  }

  /**
   * Used to pass flight logs between event related components
   * @param event An event you want to pass
   */
  setPassData(flightLog: FlightLog) {
    this.passedData = flightLog;
  }

  /**
   * Fetch and remove the flight log object held in the passed data object
   */
  fetchAndClearPassedData() {
    const ret = this.passedData;
    this.passedData = {} as FlightLog;
    return ret;
  }

  /**
   * List all of the current users flight logs
   */
  list(): Observable<FlightLog[]> {
    return this.http.get<FlightLog[]>(`${this.globals.baseUrl}/flight-logs`).pipe(
      tap(result => console.log(`Fetched ${result.length} flight logs!`)),
      catchError(this.errorService.handleError('Fetch Flight Logs', []))
    );
  }

  fetch(flightLogId: number): Observable<FlightLog> {
    return this.http.get<FlightLog>(`${this.globals.baseUrl}/flight-logs/${flightLogId}`).pipe(
      tap(result => console.log(`Fetched flight log ${result.id} flight logs!`)),
      catchError(this.errorService.handleError('Fetch Flight Log'))
    );
  }

  /**
   * List all of the current users owned ships (this includes ships on which they crew)
   */
  list_ships(): Observable<OwnedShip[]> {
    return this.http.get<OwnedShip[]>(`${this.globals.baseUrl}/flight-logs/ships`).pipe(
      tap(result => console.log(`Fetched ${result.length} owned ships!`)),
      catchError(this.errorService.handleError('Fetch Owned Ships (FL)', []))
    );
  }

  create(flight_log: FlightLog): Observable<FlightLog> {
    return this.http.post<FlightLog>(`${this.globals.baseUrl}/flight-logs/`, { flight_log }).pipe(
      tap(result => console.log(`Created flight log with id# ${result.id}!`)),
      catchError(this.errorService.handleError('Create Flight Log'))
    );
  }

  update(flight_log: FlightLog): Observable<FlightLog> {
    return this.http.patch<FlightLog>(`${this.globals.baseUrl}/flight-logs/`, { flight_log }).pipe(
      tap(result => console.log(`Updated flight log with id# ${result.id}!`)),
      catchError(this.errorService.handleError('Update Flight Log'))
    );
  }

  delete(flight_log: FlightLog): Observable<StatusMessage> {
    return this.http.delete<StatusMessage>(`${this.globals.baseUrl}/flight-logs/${flight_log.id}`).pipe(
      tap(result => console.log(`Deleted flight log with id# ${flight_log.id}!`)),
      catchError(this.errorService.handleError('Remove Flight Log'))
    );
  }
}
