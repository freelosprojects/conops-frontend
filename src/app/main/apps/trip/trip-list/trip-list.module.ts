import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TripListComponent } from './trip-list.component';
import { DayJsPipe } from '../pipes/date.pipe';

const routes: Route[] = [{ path: '', component: TripListComponent }];

@NgModule({
  declarations: [TripListComponent, DayJsPipe],
  imports: [CommonModule, RouterModule.forChild(routes), NgxDatatableModule],
})
export class TripListModule {}
