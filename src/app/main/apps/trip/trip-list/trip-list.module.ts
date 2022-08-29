import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreDirectivesModule } from '@core/directives/directives';

import { TripListComponent } from './trip-list.component';
import { DayJsPipe } from '../pipes/date.pipe';

const routes: Route[] = [{ path: '', component: TripListComponent }];

@NgModule({
  declarations: [TripListComponent, DayJsPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    NgbModule,
    CoreDirectivesModule,
    ReactiveFormsModule,
  ],
})
export class TripListModule {}
