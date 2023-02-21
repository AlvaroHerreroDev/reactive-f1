import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { RacesComponent } from './races.component';
import { RacesStore } from './races.store';

describe('RacesComponent', () => {
  let component: RacesComponent;
  let fixture: ComponentFixture<RacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacesComponent],
      providers: [MockProvider(RacesStore)],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
