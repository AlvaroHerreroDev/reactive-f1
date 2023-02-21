import { NgClass, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { paginationOptions } from '../../f1/f1.config';
import { Nullable } from '../nullable';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
  ],
})
export class PaginatorComponent {

  readonly options = paginationOptions;
  @Input() selectedMaxItems?: Nullable<number>;
  @Input() hasPrev: Nullable<boolean> = false;
  @Input() hasNext: Nullable<boolean> = false;

  @Output() updateMaxItems = new EventEmitter<number>()
  @Output() prev = new EventEmitter<void>()
  @Output() next = new EventEmitter<void>()

}
