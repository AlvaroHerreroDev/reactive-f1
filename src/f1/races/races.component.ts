import { AsyncPipe, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { StatusPipe } from '../../shared/status.pipe';
import { RacesStore } from './races.store';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgForOf, LoaderComponent,
    PaginatorComponent, NgIf, SlicePipe, StatusPipe],
})
export class RacesComponent {

  private readonly racesStore = inject(RacesStore);

  items$ = this.racesStore.items$;
  loading$ = this.racesStore.loading$;

  selectedMaxItems$ = this.racesStore.selectedMaxItems$;

  hasPrev$ = this.racesStore.hasPrev$;
  hasNext$ = this.racesStore.hasNext$;

  updateMaxItems(maxItems: number) {
    this.racesStore.fetchRaces({maxItems});
  }

  next() {
    this.racesStore.fetchRaces({next: true});
  }

  prev() {
    this.racesStore.fetchRaces({prev: true});
  }

  fetchQualifying(round: number) {
    this.racesStore.fetchQualifying(round);
  }
}
