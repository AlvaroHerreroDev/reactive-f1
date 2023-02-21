import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders } from 'ng-mocks';
import { F1Service } from '../f1.service';
import { F1Store } from '../f1.store';

import { DriversComponent } from './drivers.component';

describe('DriversComponent', () => {
  let component: DriversComponent;
  let fixture: ComponentFixture<DriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversComponent],
      providers: [MockProviders(F1Service, F1Store)],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
