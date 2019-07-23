import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, Subject } from 'rxjs';
import { ILNewsStory } from '../models/news.model';
import { tap, catchError } from 'rxjs/operators';
import { Globals } from '../globals';
import { StatusMessage } from '../models/misc.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private errorService: ErrorService, private globals: Globals) { }

  private dataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData()
  {
    console.log("News service data refresh called!");    
    this.dataRefreshSource.next();
  }

  /**
   * Fetch available news stories
   * @returns Observable of news stories
   */
  list(): Observable<ILNewsStory[]> {
    return this.http.get<ILNewsStory[]>(`${this.globals.baseUrl}/news`).pipe(
      tap(results => console.log(`Found ${results.length} news stories!`)),
      catchError(this.errorService.handleError<any>('Fetch News'))
    );
  }

  fetch(news_story_id: string): Observable<ILNewsStory> {
    return this.http.get<ILNewsStory>(`${this.globals.baseUrl}/news/${news_story_id}`).pipe(
      tap(results => console.log(`Found news story!`)),
      catchError(this.errorService.handleError<any>('Fetch News'))
    );
  }

  create(news_story: ILNewsStory): Observable<ILNewsStory> {
    return this.http.post<ILNewsStory>(`${this.globals.baseUrl}/news`, { news_story }).pipe(
      tap(results => console.log(`Created ${results} news story!`)),
      catchError(this.errorService.handleError<any>('Fetch News'))
    );
  }

  update(news_story: ILNewsStory): Observable<ILNewsStory> {
    return this.http.put<ILNewsStory>(`${this.globals.baseUrl}/news`, { news_story }).pipe(
      tap(results => console.log(`Updated ${results} news story!`)),
      catchError(this.errorService.handleError<any>('Fetch News'))
    );
  }

  archive(news_story: ILNewsStory): Observable<StatusMessage> {
    return this.http.delete<ILNewsStory>(`${this.globals.baseUrl}/news`).pipe(
      tap(results => console.log(`Archived story ${news_story.id} news story!`)),
      catchError(this.errorService.handleError<any>('Fetch News'))
    );
  }
}
