import { Pipe, PipeTransform } from '@angular/core';
import { Status, StatusType } from '../f1/types';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {

  transform(statuses: Status[], type: StatusType): number {
    return statuses.find(({status}) => type === status)?.count || 0;
  }

}
