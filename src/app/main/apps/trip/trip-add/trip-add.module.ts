import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';

import { TripAddComponent } from './trip-add.component';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '../../../forms/forms.module';
import { CorePipesModule } from '../../../../../@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarModule } from '../../../../../@core/components/core-sidebar/core-sidebar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputValidPipe } from '../pipes/input-valid.pipe';
import { HeaderModule } from '../../../components/header/header.module';

const routes: Route[] = [{ path: '', component: TripAddComponent }];

@NgModule({
  declarations: [TripAddComponent, InputValidPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    NgbModule,
    NgSelectModule,
    HeaderModule,
  ],
})
export class TripAddModule {}
