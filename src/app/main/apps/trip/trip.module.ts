import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'trip-scheduled',
    loadChildren: () => import('./trip-schedule/trip-schedule.module').then((m) => m.TripScheduleModule),
  },
  {
    path: 'trip-started',
    loadChildren: () => import('./trip-started/trip-started.module').then((m) => m.TripStartedModule),
  },
  {
    path: 'trip-completed',
    loadChildren: () => import('./trip-completed/trip-completed.module').then((m) => m.TripCompletedModule),
  },
  {
    path: 'trip-completed/:id',
    loadChildren: () => import('./trip-completed/trip-add/trip-add.module').then((m) => m.TripAddModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TripModule {}
