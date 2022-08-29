import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import { FlatpickrOptions } from 'ng2-flatpickr';

import { repeaterAnimation } from '@core/animations/core.animation';

import { SelectEntityService } from '../../../services/select-entity.service';
import { ISelectEntity } from '../../../models/select-entity.model';
import { TripService } from '../services/trip.service';
import { switchMap } from 'rxjs/operators';
import { ITripPost, IWorker, IWorkerPost } from '../models/trip.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation],
})
export class TripAddComponent implements OnInit {
  public dateOptions: FlatpickrOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input',
    defaultDate: new Date(),
    // altFormat: 'Y-n-j',
  };

  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
  };

  formTrip: FormGroup;

  dataForCLientsSelect$: Observable<ISelectEntity[]>;
  dataForDriversSelect$: Observable<ISelectEntity[]>;
  dataForVehicleSelect$: Observable<ISelectEntity[]>;
  dataForAreaSelect$: Observable<ISelectEntity[]>;

  private _changeClient$: Subject<number>;

  private _workers: IWorker[];

  constructor(
    private _fb: FormBuilder,
    private _selectEntity: SelectEntityService,
    private _tripService: TripService,
    private _router: Router
  ) {
    this.formTrip = this._fb.group({
      date: new FormControl(null, Validators.required),
      idClient: new FormControl(null, Validators.required),
      idDriver: new FormControl(null, Validators.required),
      idVehicle: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      isTripStart: new FormControl(false, Validators.required),
      startKm: new FormControl(null),
      endKm: new FormControl(null),
      startHour: new FormControl(null, Validators.required),
      endHour: new FormControl(null, Validators.required),
      passangers: this._fb.array([]),
    });

    this.dataForCLientsSelect$ = new Observable();
    this._changeClient$ = new Subject();
    this._workers = [];
  }

  get passangersFieldAsFormArray(): FormArray {
    return this.formTrip.get('passangers') as FormArray;
  }

  ngOnInit(): void {
    this.dataForCLientsSelect$ = this._selectEntity.getClientSelect();
    this.dataForDriversSelect$ = this._selectEntity.getDriverSelect();
    this.dataForVehicleSelect$ = this._selectEntity.getVehiclesSelect();

    this._changeClient$.pipe(switchMap((idClient) => this._tripService.getWorkersByClient(idClient))).subscribe({
      next: ({ cliente }) => {
        this._workers = cliente.trabajadores;

        if (this._workers.length > 0) {
          this.passangersFieldAsFormArray.controls.forEach((control) => {
            control.get('dni').enable();
            control.get('dni').updateValueAndValidity();
          });
        }
      },
    });

    this.addItem(true);
  }

  passangerForm(isDisabled = true): FormGroup {
    return this._fb.group({
      dni: new FormControl(isDisabled ? { value: null, disabled: true } : null, Validators.required),
      names: new FormControl({ value: null, disabled: true }, Validators.required),
      idArea: new FormControl(null, Validators.required),
      idWorker: new FormControl(null, Validators.required),
    });
  }

  addItem(isDisabled = false): void {
    if (this.passangersFieldAsFormArray.invalid) return;
    this.passangersFieldAsFormArray.push(this.passangerForm(isDisabled));
  }

  deleteItem(index: number): void {
    this.passangersFieldAsFormArray.removeAt(index);
  }

  changeClient(): void {
    const id = Number(this.formTrip.get('idClient').value);

    this._changeClient$.next(id);

    this.dataForAreaSelect$ = this._selectEntity.getAreasByClientSelect(id);
  }

  getWorkerByDni(value: string, index: number): void {
    const DNI_LENGTH = 8;
    console.log({ control: this.passangersFieldAsFormArray.at(index) });
    let dni = value.trim();
    if (!dni || dni.length !== DNI_LENGTH) return;

    const worker = this._workers.find((worker) => worker.dni === dni);

    if (!worker) {
      console.log('ups parece que el trabajador no esta registrado con el cliente');
      return;
    }

    this._workers = this._workers.filter((workerToFilter) => workerToFilter.dni !== worker.dni);

    const { nombres, apellidos, idTrabajador } = worker;

    this.passangersFieldAsFormArray.at(index).get('names').setValue(`${nombres} ${apellidos}`);
    this.passangersFieldAsFormArray.at(index).get('idWorker').setValue(idTrabajador);

    console.log({ worker, control: this.passangersFieldAsFormArray.at(index) });
  }

  sendForm(): void {
    if (this.formTrip.invalid) return;

    const {
      date,
      idClient,
      idDriver,
      idVehicle,
      start,
      end,
      isTripStart,
      startKm,
      endKm,
      startHour,
      endHour,
      passangers,
    } = this.formTrip.getRawValue();

    console.log(this.formTrip.getRawValue());

    const tripPost: ITripPost = {
      fecha: date[0],
      id_conductor: idDriver,
      id_cliente: idClient,
      id_vehiculo: idVehicle,
      origen: start,
      destino: end,
      km_inicio: startKm || null,
      km_fin: endKm || null,
      hora_inicio: startHour[0],
      hora_fin: endHour[0],
      salida: isTripStart,
      estado: 1,
      creado_por: 'test',
      viajes_detalle: passangers.map(
        (passanger): IWorkerPost => ({ id_trabajador: passanger.idWorker, id_area: passanger.idArea })
      ),
    };

    this._tripService.postTrip(tripPost).subscribe({
      next: (response) => {
        console.log(response);
        this._router.navigateByUrl('/apps/trip');
      },
    });
  }
}
