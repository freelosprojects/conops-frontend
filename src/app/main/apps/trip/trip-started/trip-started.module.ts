import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { TripStartedComponent } from './trip-started.component';
import { HeaderModule } from '../../../components/header/header.module';
import { TripListModule } from '../components/trip-list/trip-list.module';

const routes: Route[] = [{ path: '', component: TripStartedComponent }];

@NgModule({
  declarations: [TripStartedComponent],
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
export class TripStartedModule {}
