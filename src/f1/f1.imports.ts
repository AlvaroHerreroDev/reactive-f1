import { AsyncPipe } from '@angular/common';
import { DriversComponent } from './drivers/drivers.component';
import { QualifyingComponent } from './qualifying/qualifying.component';
import { RacesComponent } from './races/races.component';
import { SeasonSelectorComponent } from './season-selector/season-selector.component';

export const imports = [SeasonSelectorComponent, AsyncPipe, DriversComponent, RacesComponent, QualifyingComponent];
