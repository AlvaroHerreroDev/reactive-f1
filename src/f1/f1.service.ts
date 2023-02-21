import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Season } from './f1.config';
import { Driver, Qualifying, Race, RaceResult, Section, Status } from './types';

@Injectable()
export class F1Service {

  private readonly httpClient = inject(HttpClient);

  fetchDrivers(season: Season, maxItems: number, offset: number): Observable<Omit<Section<Driver>, 'maxItems'|'loading'>> {
    return this.httpClient.get<{MRData: any}>(`${environment.apiUrl}${season}/drivers.json?limit=${maxItems}&offset=${offset}`).pipe(
      map(({MRData: {DriverTable: {Drivers}, total, offset}}) => {
        return {items: Drivers, total: +total, offset: +offset}
      }));
  }

  fetchRaces(season: Season, maxItems: number, offset: number): Observable<Omit<Section<Race>, 'maxItems'|'loading'>> {
    return this.httpClient.get<{MRData: any}>(`${environment.apiUrl}${season}/races.json?limit=${maxItems}&offset=${offset}`).pipe(
      map(({MRData: {RaceTable: {Races}, total, offset}}) => {
        return {items: Races, total: +total, offset: +offset}
      }));
  }

  fetchQualifying(season: Season, round: number): Observable<Qualifying> {
    return this.httpClient.get<{MRData: any}>(`${environment.apiUrl}${season}/${round}/qualifying.json`).pipe(
      map(({MRData: {RaceTable: {Races}}}) => ({
        QualifyingResults: Races[0].QualifyingResults,
        raceName: Races[0].raceName,
      })));
  }

  fetchRaceResult(season: Season, round: number): Observable<RaceResult[]> {
    return this.httpClient.get<{MRData: any}>(`${environment.apiUrl}${season}/${round}/results.json`).pipe(
      map(({MRData: {RaceTable: {Races}}}) => Races[0].Results));
  }

  fetchFinishingStatus(season: Season, round: number): Observable<Status[]> {
    return this.httpClient.get<{MRData: any}>(`${environment.apiUrl}${season}/${round}/status.json`).pipe(
      map(({MRData: {StatusTable: {Status}}}) => Status));
  }

}
