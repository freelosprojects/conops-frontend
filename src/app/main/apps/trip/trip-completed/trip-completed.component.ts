import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { IResponseList } from '@core/models/response.model';

import { ITrip, EnumTripState } from '../models/trip.model';

import { TripService } from '../services/trip.service';
import { IActionList } from '../components/trip-list/action-list.model';

@Component({
  selector: 'app-trip-completed',
  templateUrl: './trip-completed.component.html',
  styleUrls: ['./trip-completed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripCompletedComponent implements OnInit {
  selectedOption: FormControl;

  tripList$: Observable<IResponseList<ITrip>>;

  actions: IActionList[];

  constructor(private _tripService: TripService, private _router: Router) {
    this.tripList$ = new Observable();
    this.actions = [
      {
        icon: 'users',
        actionName: 'Pasajeros',
        routerLink: null,
        action: (schedule) => this.addPassangers(schedule),
      },
    ];
    this.selectedOption = new FormControl(5);
  }

  ngOnInit(): void {
    this.tripList$ = this._tripService.getTripList(EnumTripState.COMPLETED);
  }

  addPassangers(trip: ITrip): void {
    console.log(trip);
    this._router.navigate(['/apps/trip/trip-completed', trip.idTrip], {
      queryParams: { idClient: trip.client.idCliente },
    });
  }
}
