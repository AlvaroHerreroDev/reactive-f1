import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Season } from './f1.config';
import { imports } from './f1.imports';
import { F1Service } from './f1.service';
import { F1Store } from './f1.store';
import { RacesStore } from './races/races.store';

// This is the main container of the feature. It provides the stores same way a module would do
@Component({
  selector: 'app-f1',
  templateUrl: './f1.component.html',
  styleUrls: ['./f1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [F1Store, RacesStore, F1Service],
  imports,
})
export class F1Component {

  private readonly f1Store = inject(F1Store);
  selectedSeason$ = this.f1Store.selectedSeason$;

  updateSeason(selectedSeason: Season) {
    this.f1Store.updateSeason(selectedSeason);
  }

}
