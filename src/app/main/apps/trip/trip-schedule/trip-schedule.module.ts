import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { TripScheduleComponent } from './trip-schedule.component';
import { HeaderModule } from '../../../components/header/header.module';
import { TripListModule } from '../components/trip-list/trip-list.module';
import { FormScheduleComponent } from './form-schedule/form-schedule.component';

const routes: Route[] = [
  { path: '', component: TripScheduleComponent },
  { path: 'form', component: FormScheduleComponent },
];

@NgModule({
  declarations: [TripScheduleComponent, FormScheduleComponent],
  imports: [
    CommonModule,
    HeaderModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TripListModule,
  ],
})
export class TripScheduleModule {}
