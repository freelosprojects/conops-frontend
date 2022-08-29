import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { RouterModule, Routes } from '@angular/router';
import { ColorListComponent } from './color-list/color-list.component';

const routes: Routes = [
  {
    path: '',
    component: ColorListComponent,
  },
  // {
  //   path: 'client-edit/:id',
  //   component: ClientEditComponent,
  // },
  // {
  //   path: 'vehicle-create',
  //   component: ColorComponent,
  // },
];

@NgModule({
  declarations: [ColorListComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes)
  ],
})
export class ColorModule { }