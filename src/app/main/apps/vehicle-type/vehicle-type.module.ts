import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeComponent } from './vehicle-type-list/vehicle-type.component';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { HeaderModule } from '../../components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: VehicleTypeComponent,
  },
];

@NgModule({
  declarations: [VehicleTypeComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes),
    HeaderModule,
  ],
})
export class VehicleTypeModule {}
