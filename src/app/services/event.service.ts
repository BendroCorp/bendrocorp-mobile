import { Injectable } from '@angular/core';
import { Globals } from '../globals';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { tap, catchError } from '../../../node_modules/rxjs/operators';
import { MessageService } from './message.service';
import { ErrorService } from './error.service';
import { Event, EventType, AttendenceType, EventBriefing, EventDebriefing, EventAttendence } from '../models/event.model';
import { StatusMessage } from '../models/misc.model';

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private errorService: ErrorService,
    private globals: Globals) { }
  private passedData = {} as Event;

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData()
  {
    console.log("Auth service data refresh called!");
    this.dataRefreshSource.next();
  }

  /**
   * Used to pass events between event related components
   * @param event An event you want to pass
   */
  setPassData(event: Event) {
    this.passedData = event;
  }

  /**
   * Fetch and remove the event object held in the passed data object
   */
  fetchAndClearPassedData() {
    const ret = this.passedData;
    this.passedData = {} as Event;
    return ret;
  }

  list(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.globals.baseUrl}/events`).pipe(
      tap(results => console.log('Retrieved events!')),
      catchError(this.errorService.handleError('Fetch Events', []))
    );
  }

  list_expired(expired_count: number = 5): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.globals.baseUrl}/events/expired/${expired_count}`).pipe(
      tap(results => console.log('Retrieved expired events!')),
      catchError(this.errorService.handleError('Fetch Expired Events', []))
    );
  }

  list_types(): Observable <EventType[]> {
    return this.http.get<EventType[]>(`${this.globals.baseUrl}/events/types`).pipe(
      tap(results => console.log('Retrieved expired events!')),
      catchError(this.errorService.handleError('Fetch Expired Events', []))
    );
  }

  list_attendence_types(): Observable<AttendenceType[]> {
    return this.http.get<AttendenceType[]>(`${this.globals.baseUrl}/events/attendence-types`).pipe(
      tap(results => console.log(`Retrieved ${results.length} attendence types!`)),
      catchError(this.errorService.handleError('Fetch Attendence Types', []))
    );
  }

  fetch(event_id: number): Observable<Event> {
    return this.http.get<Event>(`${this.globals.baseUrl}/events/${event_id}`).pipe(
      tap(results => console.log(`Retrieved event: ${results.id}!`)),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.globals.baseUrl}/events`, { event }).pipe(
      tap(result => console.log(`Created event ${result.id}!`)),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(`${this.globals.baseUrl}/events`, { event }).pipe(
      tap(result => console.log(`Updated event ${result.id}!`)),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  /**
   * Archive an event
   * @param event The event you want to archive.
   */
  archive(event: Event): Observable<StatusMessage> {
    return this.http.delete<StatusMessage>(`${this.globals.baseUrl}/events/${event.id}`).pipe(
      tap(result => console.log(`Archived event ${event.id}!`)),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  /**
   * Announce an event to all members. This can only be done once.
   * @param event The event you want to publish
   */
  publish(event: Event): Observable<Event> {
    const event_id = event.id;
    return this.http.post<Event>(`${this.globals.baseUrl}/events/publish`, { event_id }).pipe(
      tap(results => console.log('Retrieved expired events!')),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  /**
   * Add/remove an award from an event
   * @param event_id The ID of the event you want to add an award to
   * @param award_id The ID of of the award you want to add
   */
  award(event_id: number, award_id: number): Observable<Event> {
    return this.http.post<Event>(`${this.globals.baseUrl}/events/award`, { event_id, award_id }).pipe(
      tap(results => console.log('Retrieved expired events!')),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  briefing(briefing: EventBriefing): Observable<EventBriefing> {
    return this.http.patch<EventBriefing>(`${this.globals.baseUrl}/events/briefing`, { briefing }).pipe(
      tap(results => console.log('Event briefing updated!')),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  debriefing(debriefing: EventDebriefing): Observable<EventDebriefing> {
    return this.http.patch<EventDebriefing>(`${this.globals.baseUrl}/events/debriefing`, { debriefing }).pipe(
      tap(results => console.log('Event debriefing updated!')),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  startCertification(event: Event): Observable<EventAttendence[]> {
    return this.http.get<EventAttendence[]>(`${this.globals.baseUrl}/events/${event.id}/certify`).pipe(
      tap(results => console.log('Retrieved expired events!')),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  certification(event_id: number, attendences: EventAttendence[], debriefing_text: string): Observable<Event> {
    const event = { id: event_id, attendences_attributes: attendences, debriefing_attributes: { text: debriefing_text }};
    return this.http.post<Event>(`${this.globals.baseUrl}/events/${event.id}/certify`, { event, attendences, debriefing_text }).pipe(
      tap(results => console.log(`Certified event: ${results.id}!`)),
      catchError(this.errorService.handleError<any>('Fetch Expired Events'))
    );
  }

  setAttendence(event_id: number, attendence_type_id: number): Observable<EventAttendence> {
    return this.http.post<EventAttendence>(`${this.globals.baseUrl}/events/attend`, { event_id, attendence_type_id }).pipe(
      tap(results => console.log('Set event attendence!')),
      catchError(this.errorService.handleError<any>('Set Attendence'))
    );
  }
}
