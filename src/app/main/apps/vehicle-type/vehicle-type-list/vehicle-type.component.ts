import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IResponseList } from '@core/models/response.model';
import { IVehicleType } from '@core/models/vehicle-type.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VehicleTypeService } from '../services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss']
})
export class VehicleTypeComponent implements OnInit, OnDestroy {

  public vehicleType: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public itemSelected: IVehicleType | null;
  public vehicleTypeList: IResponseList<IVehicleType> = {} as IResponseList<IVehicleType>;

  public typeSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  constructor(private _vehicleTypeService: VehicleTypeService) {
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

  getVehicleTypeList(): void {
    this.subscription$.add(
      this.typeSubject$.pipe(
        switchMap(() => this._vehicleTypeService.getVehicleTypeList())
      ).subscribe(res => this.vehicleTypeList = res)
    );
    this.typeSubject$.next();
  }

  submitForm(): void {
    if (this.vehicleTypeIsInvalid) return;

    this._vehicleTypeService.createVehicleType({ tipo_vehiculo: this.vehicleType.value }).subscribe({
      next: () => this.typeSubject$.next()
    });
  }

  edit(item: IVehicleType) {
    this.itemSelected = item;
    this.vehicleType.setValue(item.vehicleType);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
