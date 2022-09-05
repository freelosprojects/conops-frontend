import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreDirectivesModule } from '@core/directives/directives';

import { TripCompletedComponent } from './trip-completed.component';
import { HeaderModule } from '../../../components/header/header.module';
import { TripPipeModule } from '../pipes/trip-pipes.module';
import { TripListModule } from '../components/trip-list/trip-list.module';

const routes: Route[] = [{ path: '', component: TripCompletedComponent }];

@NgModule({
  declarations: [TripCompletedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    NgbModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
    HeaderModule,
    TripPipeModule,
    TripListModule,
  ],
})
export class TripCompletedModule {}
