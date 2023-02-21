import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Season } from './f1.config';

interface F1State {
  selectedSeason: Season,

}

const F1InitialState: F1State = {
  selectedSeason: 2022,
}

@Injectable()
export class F1Store extends ComponentStore<F1State> {


  // SELECTORS
  selectedSeason$ = this.select(({selectedSeason}) => selectedSeason);

  constructor() {
    super(F1InitialState);
  }

  updateSeason(selectedSeason: Season) {
    this.patchState({selectedSeason});
  }

}
