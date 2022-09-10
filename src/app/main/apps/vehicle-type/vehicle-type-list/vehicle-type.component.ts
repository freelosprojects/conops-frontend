import { Component, OnDestroy, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { IVehicleType } from '@core/models/vehicle-type.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VehicleTypeService } from '../services/vehicle-type.service';
import { ToastService } from 'app/main/components/toasts/toasts.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VehicleTypeComponent implements OnInit, OnDestroy {
  public vehicleType: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public itemSelected: IVehicleType | null;
  public vehicleTypeList: IResponseList<IVehicleType> = {} as IResponseList<IVehicleType>;

  public typeSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(private _vehicleTypeService: VehicleTypeService, private _toastService: ToastService) {
    this.vehicleType = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
  }

  get vehicleTypeIsValid(): boolean {
    return !this.vehicleType.invalid && this.vehicleType.touched;
  }

  get vehicleTypeIsInvalid(): boolean {
    return this.vehicleType.invalid && this.vehicleType.touched;
  }

  ngOnInit(): void {
    this.getVehicleTypeList();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getVehicleTypeList(): void {
    this.subscription$.add(
      this.typeSubject$
        .pipe(switchMap(() => this._vehicleTypeService.getVehicleTypeList()))
        .subscribe((res) => (this.vehicleTypeList = res))
    );
    this.typeSubject$.next();
  }

  submitForm(): void {
    if (this.vehicleTypeIsInvalid) return;

    if (!this.itemSelected) {
      this._vehicleTypeService.createVehicleType({ tipo_vehiculo: this.vehicleType.value }).subscribe({
        next: (response) => {
          this.message = response.message;
          this.itemSelected = null;
          this.vehicleType.reset();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.typeSubject$.next();
        },
        error: (response) => {
          this.message = response.error.message;
          this._toastService.showError(this.toast, 'Ocurrio un problema');
        },
      });
    } else {
      this._vehicleTypeService
        .putVehicleType({ tipo_vehiculo: this.vehicleType.value }, this.itemSelected.idVehicleType)
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.itemSelected = null;
            this.vehicleType.reset();
            this._toastService.showSuccess(this.toast, 'Operación exitosa');
            this.typeSubject$.next();
          },
          error: (response) => {
            this.message = response.error.message;
            this._toastService.showError(this.toast, 'Ocurrio un problema');
          },
        });
    }
  }

  edit(item: IVehicleType) {
    this.itemSelected = item;
    this.vehicleType.setValue(item.vehicleType);
  }

  delete(id: number) {
    this._vehicleTypeService.deleteVehicleType(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.itemSelected = null;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.typeSubject$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }
}
