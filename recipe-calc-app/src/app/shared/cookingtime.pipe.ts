import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cookingtime',
})
export class CookingtimePipe implements PipeTransform {
  transform(cookingTimeValue: number): unknown {
    switch (cookingTimeValue) {
      case 1:
        return '30 Minutes';
      case 2:
        return '1 hour';
      case 3:
        return '1 hour & 30 minutes';
      case 4:
        return '2 hours';
      default:
        return 'Not provided';
    }
  }
}
