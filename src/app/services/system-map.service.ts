import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Globals } from '../globals';
import { Subject, Observable } from 'rxjs';
import {
  StarSystem,
  Planet,
  Moon,
  SystemObject,
  Settlement,
  SystemImage,
  SystemLocation,
  SystemMapTypes 
} from '../models/system-map.model';
import { tap, catchError } from 'rxjs/operators';
import { StatusMessage } from '../models/misc.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemMapService {

  constructor(private http: HttpClient, private errorService: ErrorService, private globals: Globals) { }

  private dataRefreshSource = new Subject();
  private fullDataRefreshSource = new Subject();
  dataRefreshAnnounced$ = this.dataRefreshSource.asObservable();
  fullDataRefreshAnnounced$ = this.fullDataRefreshSource.asObservable();
  /**
   * Call this to signal all subscribers to refresh their data
   */
  refreshData()
  {
    console.log("System Map service data refresh called!");
    this.dataRefreshSource.next();
  }

  fullRefreshData() {
    this.fullDataRefreshSource.next();
  }

  list(): Observable<StarSystem[]> {
    return this.http.get<StarSystem[]>(`${this.globals.baseUrl}/system-map`).pipe(
      tap(result => {
        console.log(`Fetched ${result.length} star systems!`)
        console.log(result);
      }),
      catchError(this.errorService.handleError('Fetch System Map', []))
    );
  }

  addSystem(system: StarSystem): Observable<StarSystem>
  {
    return this.http.post<StarSystem>(`${this.globals.baseUrl}/system-map`, { system }).pipe(
      tap(result => console.log(`Created system!`)),
      catchError(this.errorService.handleError<any>('Create System'))
    );
  }

  updateSystem(system: StarSystem): Observable<StarSystem>
  {
    // system.jurisdiction_id = Number(`${system.jurisdiction_id}`)

    return this.http.put<StarSystem>(`${this.globals.baseUrl}/system-map`, { system }).pipe(
      tap(result => console.log(`Updated system!`)),
      catchError(this.errorService.handleError<any>('Update System'))
    );
  }

  archiveSystem(): Observable<StatusMessage>
  {
    throw "Not available!"
  }

  addPlanet(planet:Planet) : Observable<Planet>
  {
    return this.http.post<Planet>(`${this.globals.baseUrl}/system-map/planet`, { planet }).pipe(
      tap(result => console.log(`Created planet!`)),
      catchError(this.errorService.handleError<any>('Create Planet'))
    )
  }

  updatePlanet(planet:Planet) : Observable<Planet>
  {
    return this.http.patch<Planet>(`${this.globals.baseUrl}/system-map/planet`, { planet }).pipe(
      tap(result => console.log(`Updated planet!`)),
      catchError(this.errorService.handleError<any>('Update Planet'))
    )
  }

  archivePlanet(planet:Planet) : Observable<Planet>
  {
    return this.http.delete<Planet>(`${this.globals.baseUrl}/system-map/planet/${planet.id}`).pipe(
      tap(result => console.log(`Archived planet!`)),
      catchError(this.errorService.handleError<any>('Archive Planet'))
    )
  }

  addMoon(moon:Moon) : Observable<Moon>
  {
    return this.http.post<Moon>(`${this.globals.baseUrl}/system-map/moon`, { moon }).pipe(
      tap(result => console.log(`Created moon!`)),
      catchError(this.errorService.handleError<any>('Create Planet'))
    )
  }

  updateMoon(moon:Moon) : Observable<Moon>
  {
    return this.http.patch<Moon>(`${this.globals.baseUrl}/system-map/moon`, { moon }).pipe(
      tap(result => console.log(`Updated moon!`)),
      catchError(this.errorService.handleError<any>('Update Moon'))
    )
  }

  archiveMoon(moon:Moon) : Observable<Moon>
  {
    return this.http.delete<Moon>(`${this.globals.baseUrl}/system-map/moon/${moon.id}`).pipe(
      tap(result => console.log(`Archived moon!`)),
      catchError(this.errorService.handleError<any>('Archive Moon'))
    )
  }

  addSystemObject(system_object:SystemObject) : Observable<SystemObject>
  {
    return this.http.post<SystemObject>(`${this.globals.baseUrl}/system-map/system-object`, { system_object }).pipe(
      tap(result => console.log(`Created system object!`)),
      catchError(this.errorService.handleError<any>('Create System Object'))
    )
  }

  updateSystemObject(system_object:SystemObject) : Observable<SystemObject>
  {
    return this.http.patch<SystemObject>(`${this.globals.baseUrl}/system-map/system-object`, { system_object }).pipe(
      tap(result => console.log(`Updated system object!`)),
      catchError(this.errorService.handleError<any>('Update System Object'))
    )
  }

  archiveSystemObject(system_object:SystemObject) : Observable<SystemObject>
  {
    return this.http.delete<SystemObject>(`${this.globals.baseUrl}/system-map/system-object/${system_object.id}`).pipe(
      tap(result => console.log(`Archived system object!`)),
      catchError(this.errorService.handleError<any>('Archive System Object'))
    )
  }

  addSettlement(settlement:Settlement) : Observable<Settlement>
  {
    return this.http.post<SystemObject>(`${this.globals.baseUrl}/system-map/settlement`, { settlement }).pipe(
      tap(result => console.log(`Created settlement!`)),
      catchError(this.errorService.handleError<any>('Create Settlement'))
    )
  }

  updateSettlement(settlement:Settlement) : Observable<Settlement>
  {
    return this.http.patch<Settlement>(`${this.globals.baseUrl}/system-map/settlement`, { settlement }).pipe(
      tap(result => console.log(`Updated settlement!`)),
      catchError(this.errorService.handleError<any>('Update Settlement'))
    )
  }

  archiveSettlement(settlement:Settlement) : Observable<Settlement>
  {
    return this.http.delete<Settlement>(`${this.globals.baseUrl}/system-map/settlement/${settlement.id}`).pipe(
      tap(result => console.log(`Archived settlement!`)),
      catchError(this.errorService.handleError<any>('Archive Settlement'))
    )
  }

  addSystemImage(image:SystemImage) : Observable<SystemImage>
  {
    return this.http.post<SystemImage>(`${this.globals.baseUrl}/system-map/image`, { image }).pipe(
      tap(result => console.log(`Created image!`)),
      catchError(this.errorService.handleError<any>('Create Image'))
    )
  }

  updateSystemImage(image:SystemImage) : Observable<SystemImage>
  {
    return this.http.patch<SystemImage>(`${this.globals.baseUrl}/system-map/image`, { image }).pipe(
      tap(result => console.log(`Updated image!`)),
      catchError(this.errorService.handleError<any>('Update Image'))
    )
  }

  archiveSystemImage(image:SystemImage) : Observable<SystemImage>
  {
    return this.http.delete<SystemImage>(`${this.globals.baseUrl}/system-map/image/${image.id}`).pipe(
      tap(result => console.log(`Archived imgage!`)),
      catchError(this.errorService.handleError<any>('Archive Image'))
    )
  }

  addLocation(location:SystemLocation) : Observable<SystemLocation>
  {
    return this.http.post<SystemLocation>(`${this.globals.baseUrl}/system-map/location`, { location }).pipe(
      tap(result => console.log(`Created location!`)),
      catchError(this.errorService.handleError<any>('Create Location'))
    )
  }

  updateLocation(location:SystemLocation) : Observable<SystemLocation>
  {
    return this.http.patch<SystemLocation>(`${this.globals.baseUrl}/system-map/location`, { location }).pipe(
      tap(result => console.log(`Updated location!`)),
      catchError(this.errorService.handleError<any>('Update Location'))
    )
  }

  archiveLocation(location:SystemLocation) : Observable<SystemLocation>
  {
    return this.http.delete<SystemLocation>(`${this.globals.baseUrl}/system-map/location/${location.id}`).pipe(
      tap(result => console.log(`Archived location!`)),
      catchError(this.errorService.handleError<any>('Archive Location'))
    )
  }

  addFlora()
  {
    throw "Not available!"
  }

  updateFlora()
  {
    throw "Not available!"
  }

  archiveFlora()
  {
    throw "Not available!"
  }

  addFauna()
  {
    throw "Not available!"
  }

  updateFauna()
  {
    throw "Not available!"
  }

  archiveFauna()
  {
    throw "Not available!"
  }

  fetch_types(): Observable<SystemMapTypes>
  {
    return this.http.get<SystemMapTypes>(`${this.globals.baseUrl}/system-map/types`).pipe(
      tap(results => console.log("Fetched System Map Types")),
      catchError(this.errorService.handleError<any>('Fetch System Map Types'))
    )
  }
}
