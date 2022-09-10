import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreDirectivesModule } from '@core/directives/directives';
import { HeaderModule } from '../../../components/header/header.module';
import { PassangerListComponent } from './passanger-list.component';

const route: Route[] = [{ path: 'passanger-list', component: PassangerListComponent }];

@NgModule({
  declarations: [PassangerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HeaderModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
  ],
})
export class PassangerListModule {}
