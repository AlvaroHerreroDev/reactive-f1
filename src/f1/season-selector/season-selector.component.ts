import { NgClass, NgFor, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { availableSeasons, Season } from '../f1.config';

@Component({
  selector: 'app-season-selector',
  templateUrl: './season-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, NgClass, NgForOf],
})
export class SeasonSelectorComponent {

  readonly availableSeasons = availableSeasons;
  @Input() selectedSeason: Season = null;
  @Output() updateSeason = new EventEmitter<Season>();

}
