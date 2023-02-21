import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, forkJoin, map, Observable, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { defaultMaxItems } from '../f1.config';
import { F1Service } from '../f1.service';
import { F1Store } from '../f1.store';
import { Qualifying, Race, Section } from '../types';


interface RacesState extends Section<Race> {
  currentQualifying?: Qualifying;
}

const racesInitialState: RacesState = {
  offset: 0,
  total: 0,
  items: [],
  maxItems: defaultMaxItems,
  loading: false,
}

@Injectable()
export class RacesStore extends ComponentStore<RacesState> {

  private readonly f1Service = inject(F1Service);
  private readonly f1Store = inject(F1Store);

  // SELECTORS
  items$ = this.select(({items}) => items);
  loading$ = this.select(({loading}) => loading);
  selectedMaxItems$ = this.select(({maxItems}) => maxItems);
  hasPrev$ = this.select(({offset}) => offset > 0);
  hasNext$ = this.select(({offset, items, total}) => offset + items.length < total);
  currentQualifying$ = this.select(({currentQualifying}) => currentQualifying);

  constructor() {
    super(racesInitialState);
    this.seasonChange();
  }

  // EFFECTS

  readonly seasonChange = this.effect(($: Observable<void>) => {
    return $.pipe(
      take(1),
      switchMap(() => this.f1Store.selectedSeason$),
      tap(() => this.fetchRaces()),
    )
  });

  readonly fetchRaces = this.effect(($: Observable<Partial<{maxItems: number, next: boolean, prev: boolean}|void>>) => {
    return $.pipe(
      tap((params) => {
        this.patchState({loading: true});
        if (params?.maxItems) {
          this.patchState({maxItems: params.maxItems})
        }
        if (params?.next) {
          this.patchState(state => ({
            offset: Math.min(state.offset + state.maxItems, state.total),
          }))
        }
        if (params?.prev) {
          this.patchState(state => ({
            offset: Math.max(0, state.offset - state.maxItems),
          }))
        }
      }),
      withLatestFrom(this.f1Store.selectedSeason$),
      switchMap(([, selectedSeason]) => {
          // Within the store we can access data synchronously
          const {maxItems, offset} = this.get();
          return this.f1Service.fetchRaces(selectedSeason, maxItems, offset)
            // Catch the error. We don't want this error to complete the effect
            .pipe(catchError(() => EMPTY))
        },
      ),
      switchMap((races) => {
          // Request the results for every race
          return forkJoin(races.items.map(race =>
            // Fetch additional data per race
            forkJoin([
              this.f1Service.fetchRaceResult(race.season, race.round),
              this.f1Service.fetchFinishingStatus(race.season, race.round),
            ])
              .pipe(map(([results, statuses]) => ({...race, results, statuses}))),
          ))
            .pipe(
              // Map the results to the races
              map(itemsWithResultAndStats => ({...races, items: itemsWithResultAndStats})),
              tapResponse(
                // Update the store
                (races) => this.patchState(state => ({
                  ...races,
                })),
                // Catch the error. We don't want this error to complete the effect
                () => EMPTY,
                // Reset the loader
                () => this.patchState({loading: false}),
              ))
        },
      ),
    )
  });

  readonly fetchQualifying = this.effect(($: Observable<number>) => {
    return $.pipe(
      withLatestFrom(this.f1Store.selectedSeason$),
      switchMap(([round, selectedSeason]) => this.f1Service.fetchQualifying(selectedSeason, round)
        .pipe(tapResponse(
          // Update the store
          (currentQualifying) => this.patchState({currentQualifying}),
          // Catch the error. We don't want this error to complete the effect
          () => EMPTY)),
      ),
    )
  });

}
