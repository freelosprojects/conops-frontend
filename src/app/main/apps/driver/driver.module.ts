import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreSidebarModule } from '@core/components';
import { DriverEditComponent } from './driver-edit/driver-edit.component';
import { HeaderModule } from '../../components/header/header.module';

const routes: Routes = [
  {
    path: 'driver-list',
    component: DriverListComponent,
  },
  {
    path: 'driver-edit/:id',
    component: DriverEditComponent,
  },
  {
    path: 'driver-create',
    component: DriverEditComponent,
  },
];

@NgModule({
  declarations: [DriverListComponent, DriverEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreDirectivesModule,
    Ng2FlatpickrModule,
    CorePipesModule,
    NgbModule,
    NgSelectModule,
    CoreSidebarModule,
    HeaderModule,
  ],
})
export class DriverModule {}
