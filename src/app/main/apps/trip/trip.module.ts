import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./trip-list/trip-list.module').then((m) => m.TripListModule),
  },
  {
    path: 'trip-add',
    loadChildren: () => import('./trip-add/trip-add.module').then((m) => m.TripAddModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TripModule {}
