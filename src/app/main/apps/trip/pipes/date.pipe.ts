import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

@Pipe({ name: 'dayJs' })
export class DayJsPipe implements PipeTransform {
  transform(date: Date, type: 'date' | 'hour' = 'date'): string {
    switch (type) {
      case 'hour':
        return dayjs(date).format('LT');

      default:
        return dayjs(date).format('DD-MM-YYYY');
    }
  }
}
