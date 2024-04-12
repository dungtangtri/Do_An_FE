import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any, args: any = 'dd/MM/yyyy'): any {
    if (typeof value === 'object' && Array.isArray(value)) {
      const [date1, date2] = value;

      if (!date2) {
        return super.transform(date1, args);
      } else {
        return `${super.transform(date1, args)} - ${super.transform(
          date2,
          args
        )}`;
      }
    }

    if (typeof value === 'object') {
      return super.transform(value, args);
    }

    return value;
  }
}
