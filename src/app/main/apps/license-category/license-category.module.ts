import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LicenseCategoryComponent } from './license-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { HeaderModule } from '../../components/header/header.module';

const routes: Route[] = [
  {
    path: '',
    component: LicenseCategoryComponent,
  },
];

@NgModule({
  declarations: [LicenseCategoryComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CoreDirectivesModule,
    HeaderModule,
  ],
})
export class LicenseCategoryModule {}
