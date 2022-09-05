import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrOptions } from 'ng2-flatpickr';

import { IResponseList } from '@core/models/response.model';

import { TripService } from '../services/trip.service';
import { ITrip, EnumTripState } from '../models/trip.model';
import { IActionList } from '../components/trip-list/action-list.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-trip-schedule',
  templateUrl: './trip-schedule.component.html',
  styleUrls: ['./trip-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripScheduleComponent implements OnInit, AfterViewInit {
  actions: IActionList[];

  tripList$: Observable<IResponseList<ITrip>>;

  @ViewChild('modalTemplateRef') modalTemplateRef: TemplateRef<any> | null;

  modalRef: NgbModalRef | null;

  formScheduled: FormGroup;

  tripToStart: ITrip | null;

  reloadTripList$: Subject<void>;

  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
  };

  constructor(private _tripService: TripService, private _modalService: NgbModal, private _fb: FormBuilder) {
    this.tripList$ = new Observable();
    this.modalTemplateRef = null;
    this.tripToStart = null;
    this.actions = [
      {
        icon: 'play',
        actionName: 'Iniciar',
        routerLink: null,
        action: (schedule) => this.editSchedule(schedule),
      },
    ];
    this.formScheduled = this._fb.group({
      startHour: new FormControl(null, Validators.required),
      startKm: new FormControl(null),
    });
    this.modalRef = null;
    this.reloadTripList$ = new Subject();
  }

  ngOnInit(): void {
    this.tripList$ = this.reloadTripList$.pipe(switchMap(() => this._tripService.getTripList(EnumTripState.SCHEDULE)));
  }

  ngAfterViewInit(): void {
    this.reloadTripList$.next();
  }

  ngOnDestroy(): void {
    this.reloadTripList$.complete();
  }

  isFieldInvalid(name: string): boolean {
    const control = this.formScheduled.get(name);
    return control.invalid && control.touched;
  }

  editSchedule(schedule: ITrip): void {
    this.tripToStart = schedule;
    this.modalRef = this._modalService.open(this.modalTemplateRef, {
      centered: true,
    });
  }

  startTrip(): void {
    this.formScheduled.markAllAsTouched();

    if (this.formScheduled.invalid) return;

    const { startHour, startKm } = this.formScheduled.value;

    this._tripService
      .startTrip({
        hora_inicio: startHour[0],
        id_viaje_cabecera: this.tripToStart.idTrip,
        km_inicio: startKm,
      })
      .subscribe({
        next: (response) => {
          this.modalRef.close();
          this.reloadTripList$.next();
        },
      });
  }
}
