import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transRuta'
})
export class TransRutaPipe implements PipeTransform {

  transform(value: string): string {
    value = value.toLowerCase();
    const nombre: string[] = value.split('/');
    value = nombre[2].charAt(0).toUpperCase() + nombre[2].substr(1);
    return value;
  }

}
