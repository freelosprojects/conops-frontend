import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandListComponent } from './brand-list/brand-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { HeaderModule } from '../../components/header/header.module';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: BrandListComponent,
  },
];

@NgModule({
  declarations: [BrandListComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes),
    HeaderModule
  ],
})
export class BrandModule {}
