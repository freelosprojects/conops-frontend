import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TokenInterceptor } from 'app/auth/helpers/token.interceptor';

// routing
const routes: Routes = [
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then((m) => m.EmailModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then((m) => m.InvoiceModule),
  },
  {
    path: 'e-commerce',
    loadChildren: () => import('./ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'area',
    loadChildren: () => import('./areas/areas.module').then((m) => m.AreasModule),
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then((m) => m.DriverModule),
  },
  {
    path: 'passanger',
    loadChildren: () => import('./passanger/passanger.module').then((m) => m.PasssangerModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./clients/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'license-category',
    loadChildren: () => import('./license-category/license-category.module').then((m) => m.LicenseCategoryModule),
  },
  {
    path: 'trip',
    loadChildren: () => import('./trip/trip.module').then((m) => m.TripModule),
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
  {
    path: 'color',
    loadChildren: () => import('./color/color.module').then((m) => m.ColorModule),
  },
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module').then((m) => m.BrandModule),
  },
  {
    path: 'vehicle-model',
    loadChildren: () => import('./vehicle-model/vehicle-model.module').then((m) => m.VehicleModelModule),
  },
  {
    path: 'vehicle-type',
    loadChildren: () => import('./vehicle-type/vehicle-type.module').then((m) => m.VehicleTypeModule),
  },
  {
    path: 'fuel',
    loadChildren: () => import('./fuel/fuel.module').then((m) => m.FuelModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },
];

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AppsModule {}
