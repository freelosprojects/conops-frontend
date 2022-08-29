import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandListComponent } from './brand-list/brand-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';

const routes: Routes = [
  {
    path: '',
    component: BrandListComponent,
  }
];

@NgModule({
  declarations: [BrandListComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes)
  ],
})
export class BrandModule { }