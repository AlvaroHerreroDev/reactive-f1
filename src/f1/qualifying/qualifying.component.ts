import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RacesStore } from '../races/races.store';

@Component({
  selector: 'app-qualifying',
  templateUrl: './qualifying.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    LoaderComponent,
  ],
})
export class QualifyingComponent {

  currentQualifying$ = inject(RacesStore).currentQualifying$;

}
