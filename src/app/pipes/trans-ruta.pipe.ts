import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transRuta'
})
export class TransRutaPipe implements PipeTransform {

  transform(value: string): string {
    value = value.toLowerCase();
    let nombre = value.split('/');
    value = nombre[1].charAt(0).toUpperCase() + nombre[1].substr(1);
    return value;
  }

}
