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
import { ToastService } from '../../../components/toasts/toasts.service';

@Component({
  selector: 'app-trip-schedule',
  templateUrl: './trip-started.component.html',
  styleUrls: ['./trip-started.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TripStartedComponent implements OnInit, AfterViewInit {
  actions: IActionList[];

  tripList$: Observable<IResponseList<ITrip>>;

  @ViewChild('modalTemplateRef') modalTemplateRef: TemplateRef<any> | null;

  modalRef: NgbModalRef | null;

  formStart: FormGroup;

  tripToComplete: ITrip | null;

  reloadTripList$: Subject<void>;

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
  };

  constructor(
    private _tripService: TripService,
    private _modalService: NgbModal,
    private _fb: FormBuilder,
    private _toastService: ToastService
  ) {
    this.tripList$ = new Observable();
    this.modalTemplateRef = null;
    this.tripToComplete = null;
    this.actions = [
      {
        icon: 'flag',
        actionName: 'Finalizar',
        routerLink: null,
        action: (schedule) => this.editSchedule(schedule),
      },
    ];
    this.formStart = this._fb.group({
      endHour: new FormControl(null, Validators.required),
      endKm: new FormControl(null),
    });
    this.modalRef = null;
    this.reloadTripList$ = new Subject();
  }

  ngOnInit(): void {
    this.tripList$ = this.reloadTripList$.pipe(switchMap(() => this._tripService.getTripList(EnumTripState.STARTED)));
  }

  ngAfterViewInit(): void {
    this.reloadTripList$.next();
  }

  ngOnDestroy(): void {
    this.reloadTripList$.complete();
  }

  isFieldInvalid(name: string): boolean {
    const control = this.formStart.get(name);
    return control.invalid && control.touched;
  }

  editSchedule(schedule: ITrip): void {
    this.tripToComplete = schedule;
    this.modalRef = this._modalService.open(this.modalTemplateRef, {
      centered: true,
    });
  }

  completeTrip(): void {
    this.formStart.markAllAsTouched();

    if (this.formStart.invalid) return;

    const { endHour, endKm } = this.formStart.value;

    this._tripService
      .completeTrip({
        hora_fin: endHour[0],
        id_viaje_cabecera: this.tripToComplete.idTrip,
        km_fin: endKm,
      })
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.modalRef.close();
          this.reloadTripList$.next();
        },
        error: (response) => {
          this.message = response.message;
          this._toastService.showError(this.toast, 'Ocurrio un problema');
        },
      });
  }
}
