import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarModule } from '@core/components';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { HeaderModule } from '../../components/header/header.module';

const routes: Routes = [
  {
    path: 'client-list',
    component: ClientListComponent,
  },
  {
    path: 'client-edit/:id',
    component: ClientEditComponent,
  },
  {
    path: 'client-create',
    component: ClientEditComponent,
  },
];

@NgModule({
  declarations: [ClientListComponent, ClientEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreDirectivesModule,
    Ng2FlatpickrModule,
    CorePipesModule,
    NgbModule,
    NgSelectModule,
    CoreSidebarModule,
    HeaderModule,
  ],
})
export class ClientModule {}
