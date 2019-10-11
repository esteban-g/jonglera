import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TwoDigitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'twoDigit',
})
export class TwoDigitPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
  
    //return value.toLowerCase();
    return this.pad(value, 2, 0);
  }


  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
