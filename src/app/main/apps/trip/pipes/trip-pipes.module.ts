import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayJsPipe } from './date.pipe';

@NgModule({
  declarations: [DayJsPipe],
  imports: [CommonModule],
  exports: [DayJsPipe],
})
export class TripPipeModule {}
