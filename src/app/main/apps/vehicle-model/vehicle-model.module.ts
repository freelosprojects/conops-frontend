import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehicleModelListComponent } from './vehicle-model-list/vehicle-model-list.component';
import { CoreDirectivesModule } from '@core/directives/directives';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { HeaderModule } from '../../components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: VehicleModelListComponent,
  },
];

@NgModule({
  declarations: [VehicleModelListComponent],
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
export class VehicleModelModule {}
