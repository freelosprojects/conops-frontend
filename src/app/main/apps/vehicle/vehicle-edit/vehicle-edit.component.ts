import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INgSelect } from '@core/models/ng-select.model';
import { NgSelectService } from 'app/config/service/ng-select.service';
import { Observable, Subscription } from 'rxjs';
import { IBrand, Vehicle, VehiclePost, VehicleResponse } from '../../models/adapters/driver.class';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  // styleUrls: ['./vehicle-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleEditComponent implements OnInit {

  public vehicleForm: FormGroup;
  public title: string = 'Editar';
  public isCreate: boolean = false;

  public vehicle: VehicleResponse = {} as VehicleResponse;
  public subscription$: Subscription = new Subscription();

  public selectType: INgSelect[];
  public selectFuel: INgSelect[];
  public selectBrand: INgSelect[];
  public selectModel: INgSelect[];
  public selectColor: INgSelect[];
  public selectLicenseCategory: INgSelect[];

  constructor(
    private _form: FormBuilder,
    private _selectService: NgSelectService,
    private _vehicleService: VehicleService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initNgSelect();
  }

  initNgSelect(): void {
    this.subscription$.add(
      this._selectService.getFuel().subscribe(res => this.selectFuel = res)
    );
    this.subscription$.add(
      this._selectService.getType().subscribe(res => this.selectType = res),
    );
    this.subscription$.add(
      this._selectService.getBrand().subscribe(res => this.selectBrand = res),
    );
    this.subscription$.add(
      this._selectService.getModel().subscribe(res => this.selectModel = res),
    );
    this.subscription$.add(
      this._selectService.getColor().subscribe(res => this.selectColor = res),
    );
    this.subscription$.add(
      this._selectService.getColor().subscribe(res => this.selectColor = res),
    );
    this.subscription$.add(
      this._selectService.getselectLicenseCategory().subscribe(res => this.selectLicenseCategory = res)
    );
  }

  initForm(): void {
    this.vehicleForm = this._form.group({
      plate: [''],
      passenger: [''],
      brand: [null],
      model: [null],
      color: [null],
      type: [null],
      license: [null],
      fuel: [null],
    });
  }

  submit() {
    if (this.vehicleForm.valid) {
      const vehicle: VehiclePost = {
        placa: this.vehicleForm.get('plate')?.value,
        pasajeros: parseInt(this.vehicleForm.get('passenger')?.value),
        id_marca: this.vehicleForm.get('brand')?.value.value,
        id_modelo: this.vehicleForm.get('model')?.value.value,
        id_color: this.vehicleForm.get('color')?.value.value,
        id_tipo_vehiculo: this.vehicleForm.get('type')?.value.value,
        id_brevete_categoria: this.vehicleForm.get('license')?.value.value,
        id_tipo_combustible: this.vehicleForm.get('fuel')?.value.value
      };

      this.subscription$.add(
        this._vehicleService.createVehicle(vehicle).subscribe(res => console.log(res))
      );

      // if (this.isCreate) {
      // this.subscription$.add(
      //   this._vehicleService.createVehicle(vehicle).subscribe(res => console.log(res))
      // );
      // } else {
      //   this.subscription$.add(
      //     this._vehicleService.updateClient(vehicle, this.client.idClient).subscribe(res => console.log(res))
      //   );
      // }
    }
  }
}
