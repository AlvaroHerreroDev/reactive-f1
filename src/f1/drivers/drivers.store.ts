import { inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { defaultMaxItems } from '../f1.config';
import { F1Service } from '../f1.service';
import { F1Store } from '../f1.store';
import { Driver, Section } from '../types';

interface DriversState extends Section<Driver> {
};

const driversInitialState: DriversState = {
  offset: 0,
  total: 0,
  items: [],
  maxItems: defaultMaxItems,
  loading: false,
};

export class DriversStore extends ComponentStore<DriversState> {

  private readonly f1Service = inject(F1Service);
  private readonly f1Store = inject(F1Store);

  // SELECTORS
  items$ = this.select(({items}) => items);

  loading$ = this.select(({loading}) => loading);

  selectedMaxItems$ = this.select(({maxItems}) => maxItems);

  hasPrev$ = this.select(({offset}) => offset > 0);
  hasNext$ = this.select(({offset, items, total}) => offset + items.length < total);

  constructor() {
    super(driversInitialState);
    this.seasonChange();
  }

  // EFFECTS

  readonly seasonChange = this.effect(($: Observable<void>) => {
    return $.pipe(
      take(1),
      switchMap(() => this.f1Store.selectedSeason$),
      tap(() => this.fetchDrivers()),
    )
  });

  readonly fetchDrivers = this.effect(($: Observable<Partial<{maxItems: number, next: boolean, prev: boolean}|void>>) => {
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
          const {maxItems, offset} = this.get();
          return this.f1Service.fetchDrivers(selectedSeason, maxItems, offset)
            .pipe(
              tapResponse(
                (drivers) => this.patchState(state => ({...state, ...drivers})),
                () => EMPTY,
                // Reset the loader
                () => this.patchState({loading: false})),
            )
        },
      ),
    )
  });


}
