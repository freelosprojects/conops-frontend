import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HeaderModule } from '../../../components/header/header.module';
import { RolComponent } from './rol.component';

const routes: Route[] = [{ path: '', component: RolComponent }];

@NgModule({
  declarations: [RolComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    HeaderModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CoreDirectivesModule,
  ],
})
export class RolModule {}
