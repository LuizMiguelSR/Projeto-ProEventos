/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DateTimeFormatPipe } from './DateTimeFormat.pipe';

describe('Pipe: DateTimeFormate', () => {
  it('create an instance', () => {
    let locale = 'pt-BR';
    let pipe = new DateTimeFormatPipe(locale);
    expect(pipe).toBeTruthy();
  });
});
