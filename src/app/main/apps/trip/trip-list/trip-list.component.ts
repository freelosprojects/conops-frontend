import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  selectedOption: FormControl;
  tripList$: Observable<IResponseList<ITrip>>;

  constructor(private _tripService: TripService) {
    this.tripList$ = new Observable();
    this.selectedOption = new FormControl(5);
  }

  ngOnInit(): void {
    this.tripList$ = this._tripService.getTripList();
  }
}
