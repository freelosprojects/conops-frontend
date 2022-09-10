import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HeaderModule } from '../../components/header/header.module';
import { AreasComponent } from './areas.component';

const routes: Route[] = [{ path: 'area-list', component: AreasComponent }];

@NgModule({
  declarations: [AreasComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    HeaderModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CoreDirectivesModule,
    NgSelectModule,
  ],
})
export class AreasModule {}
