import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreCommonModule } from '@core/common.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule } from '@core/directives/directives';
import { RouterModule, Routes } from '@angular/router';
import { ColorListComponent } from './color-list/color-list.component';
import { HeaderModule } from '../../components/header/header.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'app/auth/helpers/token.interceptor';

const routes: Routes = [
  {
    path: '',
    component: ColorListComponent,
  },
];

@NgModule({
  declarations: [ColorListComponent],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    RouterModule.forChild(routes),
    HeaderModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ]
})
export class ColorModule {}
