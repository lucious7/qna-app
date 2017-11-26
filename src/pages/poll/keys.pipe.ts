import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'KeysPipe', pure: false })
export class KeysPipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    return Object.keys(value)//.map(key => value[key]);
  }

}
