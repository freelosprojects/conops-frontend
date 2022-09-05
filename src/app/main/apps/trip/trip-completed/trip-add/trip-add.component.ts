import { Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { forkJoin, Observable, of, Subject } from 'rxjs';

import { FlatpickrOptions } from 'ng2-flatpickr';
import Peru from 'flatpickr/dist/l10n/es';

import { repeaterAnimation } from '@core/animations/core.animation';

import { SelectEntityService } from '../../../../services/select-entity.service';
import { ISelectEntity } from '../../../../models/select-entity.model';
import { TripService } from '../../services/trip.service';
import { catchError, debounceTime, distinctUntilChanged, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { IPassangerGrid, IPassangerTrip, ITripDetail, ITripDetailPassangers } from '../../models/trip.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'app/main/components/toasts/toasts.service';

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
    locale: Peru.es,
    altFormat: 'Y-m-j',
  };

  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
  };

  formPassanger: FormGroup;

  passangers: ITripDetailPassangers[];

  areas: ISelectEntity[];

  passangerSelected: ITripDetailPassangers | null;

  trip: ITripDetail | null;

  selectedOption: FormControl;

  @ViewChild('toastAdd') toastAdd: TemplateRef<any>;

  @ViewChild('toastError') toastError: TemplateRef<any>;

  private _idTrip: number | null;

  private _changeTrip$: Subject<number>;

  constructor(
    private _fb: FormBuilder,
    private _selectEntity: SelectEntityService,
    private _tripService: TripService,
    private _router: Router,
    private _toastService: ToastService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.formPassanger = this._fb.group({
      dni: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      names: new FormControl({ value: null, disabled: true }, Validators.required),
      idArea: new FormControl(null, Validators.required),
      idPassanger: new FormControl(null, Validators.required),
    });

    this._changeTrip$ = new Subject();
    this.trip = null;
    this._idTrip = null;
    this.areas = [];
    this.passangers = [];
    this.selectedOption = null;
    this.selectedOption = new FormControl(5);
  }

  isFieldInvalid(name: string): boolean {
    const control = this.formPassanger.get(name);
    return control.invalid && control.touched;
  }

  get dniControl(): AbstractControl {
    return this.formPassanger.get('dni');
  }

  get namesControl(): AbstractControl {
    return this.formPassanger.get('names');
  }

  get idPassangerControl(): AbstractControl {
    return this.formPassanger.get('idPassanger');
  }

  get idAreaControl(): AbstractControl {
    return this.formPassanger.get('idArea');
  }

  ngOnInit(): void {
    this._getTripByIdAndAreas();

    this._getTrip();

    this.dniControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        filter((_) => !this.dniControl.invalid),
        switchMap((dni) =>
          this._tripService.getPassangerByDni(dni).pipe(
            catchError((_) => {
              this.namesControl.setValue(null);
              this.idPassangerControl.setValue(null);
              return of(null);
            })
          )
        )
      )
      .subscribe((passanger: IPassangerTrip | null) => {
        if (passanger) {
          const {
            pasajero: { apellidos, idPasajero, nombres },
          } = passanger;

          this.namesControl.setValue(`${nombres} ${apellidos}`);
          this.idPassangerControl.setValue(idPasajero);
        }
      });

    this.dniControl.valueChanges.subscribe((dni) => {
      if (this.dniControl.invalid && this.idPassangerControl.value) {
        this.namesControl.reset();
        this.idPassangerControl.reset();
        this.idAreaControl.reset();
      }
    });
  }

  private _getByTripById(id: number) {
    return this._tripService.getTripById(id);
  }

  private _getTrip() {
    this._changeTrip$
      .pipe(
        filter((id) => !!id),
        switchMap((idTrip) => this._getByTripById(idTrip))
      )
      .subscribe({
        next: (trip) => {
          this.passangers = [
            ...trip.viajesDetalle.map((item) => ({
              ...item,
              pasajero: {
                ...item.pasajero,
                nombres: `${item.pasajero.nombres} ${item.pasajero.apellidos}`,
              },
            })),
          ];
        },
      });
  }

  private async _getTripByIdAndAreas() {
    try {
      const id = await this._activatedRoute.params
        .pipe(
          first(),
          map((params) => params.id)
        )
        .toPromise();
      this._idTrip = id;

      const trip = await this._getByTripById(id).toPromise();

      this.trip = trip;

      const areas = await this._selectEntity.getAreasByClientSelect(id).toPromise();

      this.passangers = [
        ...trip.viajesDetalle.map((item) => ({
          ...item,
          pasajero: {
            ...item.pasajero,
            nombres: `${item.pasajero.nombres} ${item.pasajero.apellidos}`,
          },
        })),
      ];

      this.areas = [...areas];
    } catch (error) {}
  }

  sendForm(): void {
    this.formPassanger.markAllAsTouched();

    if (this.formPassanger.invalid) return;

    const { dni, idPassanger, idArea } = this.formPassanger.getRawValue();

    const passangerFinded = this.passangers.find((passanger) => passanger.pasajero.dni === dni);

    if (passangerFinded) {
      this._toastService.showError(this.toastError, 'Error');
      return;
    }

    this._tripService
      .addPassangerInTrip({
        id_viaje: this._idTrip,
        viaje_detalle: {
          id_area: idArea,
          id_pasajero: idPassanger,
        },
      })
      .subscribe({
        next: (response) => {
          this._changeTrip$.next(this.trip.idViajeCabecera);
          this.formPassanger.reset();
          this.toastSuccess(this.toastAdd, 'Pasajero agregado');
        },
        error: (errorResponse) => console.log(errorResponse),
      });
  }

  edit(detail: ITripDetailPassangers): void {
    this.formPassanger.patchValue(
      {
        dni: detail.pasajero.dni,
        names: `${detail.pasajero.nombres}`,
        idArea: detail.area.idArea,
        idPassanger: detail.pasajero.idPasajero,
      },
      { emitEvent: false }
    );

    this.dniControl.disable({ emitEvent: false });
    this.dniControl.updateValueAndValidity({ emitEvent: false });

    this.passangerSelected = detail;
  }

  update(): void {
    this.formPassanger.markAllAsTouched();

    if (this.formPassanger.invalid) return;

    const { idArea, dni } = this.formPassanger.value;

    this._tripService
      .updatePassanger({
        id_area: idArea,
        id_viaje_detalle: this.passangerSelected.idViajeDetalle,
      })
      .subscribe({
        next: (response) => {
          this._changeTrip$.next(this.trip.idViajeCabecera);
          this.passangerSelected = null;
          this.formPassanger.reset();
          this.dniControl.enable();
        },
      });
  }

  cancelUpdate(): void {
    this.passangerSelected = null;
    this.formPassanger.reset();
    this.dniControl.enable();
  }

  delete(detail: ITripDetailPassangers): void {
    this._tripService.deletePassanger(detail.idViajeDetalle).subscribe({
      next: (response) => {
        this._changeTrip$.next(this.trip.idViajeCabecera);
      },
    });
  }

  toastSuccess(toast: TemplateRef<any>, title: string) {
    this._toastService.showSuccess(toast, title);
  }
}
