import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL } from "../global";

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return `${GLOBAL.getImage}${value}`
    }
    return value
  }

}
