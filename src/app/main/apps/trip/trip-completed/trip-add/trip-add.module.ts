import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreDirectivesModule } from '@core/directives/directives';

import { TripAddComponent } from './trip-add.component';
import { HeaderModule } from '../../../../components/header/header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Route[] = [{ path: '', component: TripAddComponent }];

@NgModule({
  declarations: [TripAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    NgbModule,
    NgSelectModule,
    HeaderModule,
    NgxDatatableModule,
  ],
})
export class TripAddModule {}
