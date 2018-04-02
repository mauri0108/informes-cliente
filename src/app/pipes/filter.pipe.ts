import { Pipe, PipeTransform } from '@angular/core';
import { Protocolo } from '../models/protocolo-informe';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform( protocolos: Protocolo[], searchText: string): any[] {

    if (!protocolos) return [];
    if (!searchText) return protocolos;

    searchText = searchText.toLowerCase();

    return protocolos.filter( protocolo => {
      return protocolo.nombre.toLowerCase().includes(searchText);
    });
   }
}