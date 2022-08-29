import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { IResponseList } from '@core/models/response.model';

import { ITrip } from '../models/trip.model';

import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripListComponent implements OnInit {
  tripList$: Observable<IResponseList<ITrip>>;

  constructor(private _tripService: TripService) {
    this.tripList$ = new Observable();
  }

  ngOnInit(): void {
    this.tripList$ = this._tripService.getTripList();
  }
}
