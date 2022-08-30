import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Pipe({ name: 'isValidInput' })
export class InputValidPipe implements PipeTransform {
  constructor(ngControl: NgControl) {
    console.log(ngControl);
  }

  transform(control: string) {
    console.log(control);
    return 'text';
  }
}
