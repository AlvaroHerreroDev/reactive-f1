import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders } from 'ng-mocks';
import { RacesStore } from '../races/races.store';

import { QualifyingComponent } from './qualifying.component';

describe('QualifyingComponent', () => {
  let component: QualifyingComponent;
  let fixture: ComponentFixture<QualifyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualifyingComponent],
      providers: [MockProviders(RacesStore)],
    })
      .compileComponents();

    fixture = TestBed.createComponent(QualifyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
