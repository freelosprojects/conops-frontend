import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { FlatpickrOptions } from 'ng2-flatpickr';
import Peru from 'flatpickr/dist/l10n/es';

import { ISelectEntity } from '../../../../models/select-entity.model';
import { TripService } from '../../services/trip.service';
import { SelectEntityService } from '../../../../services/select-entity.service';
import { ITripSchedulePost } from '../../models/trip.model';
import { Router } from '@angular/router';
import { ToastService } from 'app/main/components/toasts/toasts.service';

@Component({
  templateUrl: './form-schedule.component.html',
  styleUrls: ['./form-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormScheduleComponent implements OnInit {
  formSchedule: FormGroup;

  public dateOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input',
    locale: Peru.es,
    altFormat: 'j-m-Y',
  };

  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
  };

  dataForCLientsSelect$: Observable<ISelectEntity[]>;
  dataForDriversSelect$: Observable<ISelectEntity[]>;
  dataForVehicleSelect$: Observable<ISelectEntity[]>;
  dataForAreaSelect$: Observable<ISelectEntity[]>;

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _fb: FormBuilder,
    private _tripService: TripService,
    private _selectEntity: SelectEntityService,
    private _router: Router,
    private _toastService: ToastService
  ) {
    this.formSchedule = this._fb.group({
      date: new FormControl(null, Validators.required),
      idClient: new FormControl(null, Validators.required),
      idDriver: new FormControl(null, Validators.required),
      idVehicle: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      isTripStart: new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
    this.dataForCLientsSelect$ = this._selectEntity.getClientSelect();
    this.dataForDriversSelect$ = this._selectEntity.getDriverSelect();
    this.dataForVehicleSelect$ = this._selectEntity.getVehiclesSelect();
  }

  isFieldInvalid(name: string): boolean {
    const control = this.formSchedule.get(name);
    return control.invalid && control.touched;
  }

  sendForm() {
    this.formSchedule.markAllAsTouched();

    if (this.formSchedule.invalid) return;

    const { date, idClient, idDriver, idVehicle, start, end, isTripStart } = this.formSchedule.value;

    const schedule: ITripSchedulePost = {
      fecha: date[0],
      id_cliente: idClient,
      id_conductor: idDriver,
      id_vehiculo: idVehicle,
      origen: start,
      destino: end,
      salida: isTripStart,
      creado_por: 'admin',
      estado: '0',
    };

    this._tripService.scheduleTrip(schedule).subscribe({
      next: (response) => {
        this.message = response.message;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this._router.navigateByUrl('/apps/trip/trip-scheduled');
      },
      error: (response) => {
        this.message = response.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }
}
