import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HeaderModule } from 'app/main/components/header/header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { InvoiceModule } from '../invoice/invoice.module';
import { UserRegeditComponent } from './user-regedit/user-regedit.component';
import { UsersListComponent } from './users-list.component';


const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'regedit/:id',
    component: UserRegeditComponent,
  },
];

@NgModule({
  declarations: [
    UsersListComponent,
    UserRegeditComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes),
    HeaderModule,
    NgSelectModule,
    NgbModule,
    CorePipesModule,
  ],
})
export class UsersModule { }
