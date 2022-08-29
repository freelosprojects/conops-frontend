import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { FuelComponent } from './fuel-list/fuel.component';

const routes: Routes = [
  {
    path: '',
    component: FuelComponent,
  }
];


@NgModule({
  declarations: [FuelComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes)
  ]
})
export class FuelModule { }