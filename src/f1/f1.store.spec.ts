import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Season } from './f1.config';
import { F1Store } from './f1.store';

describe('F1Store', () => {
  let store: F1Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [F1Store],
    });
    store = TestBed.inject(F1Store);
  });

  it('should create the store', () => {
    expect(store).toBeTruthy();
  });

  it('should have initial state', fakeAsync(() => {
    store.state$.subscribe((state) => {
      expect(state.selectedSeason).toBe(2022);
    });
    tick();
  }));

  it('should update selectedSeason', fakeAsync(() => {
    const newSeason: Season = 2023;
    store.updateSeason(newSeason);
    store.state$.subscribe((state) => {
      expect(state.selectedSeason).toBe(newSeason);
    });
    tick();
  }));

});
