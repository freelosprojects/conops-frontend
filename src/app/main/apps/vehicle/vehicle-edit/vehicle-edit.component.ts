import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INgSelect } from '@core/models/ng-select.model';
import { NgSelectService } from 'app/config/service/ng-select.service';
import { Subscription, EMPTY } from 'rxjs';
import { VehiclePost } from '../../models/adapters/driver.class';
import { VehicleService } from '../services/vehicle.service';
import { ToastService } from '../../../components/toasts/toasts.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicle } from '@core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['../vehicle-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VehicleEditComponent implements OnInit {
  public message: string;
  public vehicleForm: FormGroup;
  public title: string = 'Editar';
  public isCreate: boolean = false;

  public vehicle: IVehicle = {} as IVehicle;
  public subscription$: Subscription = new Subscription();

  public selectType: INgSelect[];
  public selectFuel: INgSelect[];
  public selectBrand: INgSelect[];
  public selectModel: INgSelect[] = [];
  public selectColor: INgSelect[];
  public selectLicenseCategory: INgSelect[];

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _router: Router,
    private _form: FormBuilder,
    private _route: ActivatedRoute,
    private _toastService: ToastService,
    private _selectService: NgSelectService,
    private _vehicleService: VehicleService
  ) {
    this.initForm();
    this.initNgSelect();
  }

  ngOnInit(): void {
    this.getVehicleByID();
  }

  initNgSelect(): void {
    this.subscription$.add(this._selectService.getFuel().subscribe((res) => (this.selectFuel = res)));
    this.subscription$.add(this._selectService.getType().subscribe((res) => (this.selectType = res)));
    this.subscription$.add(this._selectService.getBrand().subscribe((res) => (this.selectBrand = res)));
    this.subscription$.add(this._selectService.getColor().subscribe((res) => (this.selectColor = res)));
    this.subscription$.add(this._selectService.getColor().subscribe((res) => (this.selectColor = res)));
    this.subscription$.add(
      this._selectService.getselectLicenseCategory().subscribe((res) => (this.selectLicenseCategory = res))
    );
    this.initModelNgSelect();
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

  getVehicleByID(): void {
    this.subscription$.add(
      this._route.params.pipe(
        switchMap(params => {
          if (!params['id']) {
            this.title = 'Añadir';
            this.isCreate = true;

            return EMPTY;
          }

          return this._vehicleService.getVehicleByID(params['id']);
        })
      ).subscribe({
        next: vehicle => {
          this.vehicle = vehicle;
          this.setForm();
        },
      })
    );
  }

  setForm(): void {
    this.vehicleForm.patchValue({
      plate: this.vehicle.plate,
      passenger: this.vehicle.passenger,
      model: this.vehicle.model.model,
      color: this.vehicle.color.color,
      type: this.vehicle.vehicleType.vehicleType,
      license: this.vehicle.licenseCategory.licenseCategory,
      fuel: this.vehicle.fuelType.fuelType,
    });
    this.vehicleForm.get('brand')?.setValue(
      this.selectBrand.find(item => item.value === this.vehicle.brand.idBrand)
    );
  }

  initModelNgSelect(): void {
    this.subscription$.add(
      this.vehicleForm.get('brand')?.valueChanges.pipe(
        switchMap(res => this._selectService.getSelectModelByBrand(res.value))
      ).subscribe({
        next: (res) => this.selectModel = res
      })
    );
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
        id_tipo_combustible: this.vehicleForm.get('fuel')?.value.value,
      };

      if (this.isCreate) {
        this.subscription$.add(
          this._vehicleService.createVehicle(vehicle).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.toast, 'Operación correcta');
              this.goToVehicleList();
            }
          })
        );
      } else {
        this.subscription$.add(
          this._vehicleService.updateVehicle(vehicle, this.vehicle.idVehicle).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.toast, 'Operación correcta');
              this.goToVehicleList();
            }
          })
        );
      }
    }
  }

  goToVehicleList(): void {
    this._router.navigate(['/', 'apps', 'vehicle', 'vehicle-list']);
  }
}
