import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { HeaderModule } from '../../components/header/header.module';

const routes: Routes = [
  {
    path: 'vehicle-list',
    component: VehicleListComponent,
  },
  // {
  //   path: 'client-edit/:id',
  //   component: ClientEditComponent,
  // },
  {
    path: 'vehicle-create',
    component: VehicleEditComponent,
  },
];

@NgModule({
  declarations: [VehicleListComponent, VehicleEditComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes),
    HeaderModule,
  ],
})
export class VehicleModule {}
