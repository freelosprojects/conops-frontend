import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

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
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then((m) => m.DriverModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./clients/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'license-category',
    loadChildren: () => import('./license-category/license-category.module').then((m) => m.LicenseCategoryModule),
  },
];

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppsModule {}
