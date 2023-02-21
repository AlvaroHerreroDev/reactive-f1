import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProviders } from 'ng-mocks';

import { F1Component } from './f1.component';
import { F1Service } from './f1.service';

describe('F1Component', () => {
  let component: F1Component;
  let fixture: ComponentFixture<F1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [F1Component],
      providers: [MockProviders(F1Service, HttpClient)],
    })
      .compileComponents();

    fixture = TestBed.createComponent(F1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(F1Component);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Car Races? ✅');
  });

  it('should render components', () => {
    const fixture = TestBed.createComponent(F1Component);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-drivers')).toBeTruthy();
    expect(compiled.querySelector('app-races')).toBeTruthy();
    expect(compiled.querySelector('app-qualifying')).toBeTruthy();
  });

});
