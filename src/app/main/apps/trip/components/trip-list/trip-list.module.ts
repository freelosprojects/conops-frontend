import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreDirectivesModule } from '@core/directives/directives';

import { TripListComponent } from './trip-list.component';
import { HeaderModule } from '../../../../components/header/header.module';
import { TripPipeModule } from '../../pipes/trip-pipes.module';

@NgModule({
  declarations: [TripListComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    HeaderModule,
    ReactiveFormsModule,
    RouterModule,
    TripPipeModule,
    NgbModule,
    CoreDirectivesModule,
  ],
  exports: [TripListComponent],
})
export class TripListModule {}
