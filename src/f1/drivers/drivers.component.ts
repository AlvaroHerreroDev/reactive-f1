import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { DriversStore } from './drivers.store';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    PaginatorComponent,
    LoaderComponent,
    NgIf,
  ],
})
// We could provide the store and inject it, so future children of this component could access the same instance.
// But for simplicity I am just extending the store to inherit the effects, and selectors.
export class DriversComponent extends DriversStore {

  updateMaxItems(maxItems: number) {
    this.fetchDrivers({maxItems});
  }

  next() {
    this.fetchDrivers({next: true});
  }

  prev() {
    this.fetchDrivers({prev: true});
  }

}
