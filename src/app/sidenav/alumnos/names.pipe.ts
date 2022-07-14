//Esta pipe cambia el orden de los nombres de los estudiantes y agrega una coma en student-list

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'names'
})
export class NamesPipe implements PipeTransform {

  transform(name: string, surname: string): unknown {
    return  `${surname}, ${name}`;
  }

}
