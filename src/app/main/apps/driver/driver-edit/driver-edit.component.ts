import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverResponseData } from '@fake-db/invoice.data';
import { EMPTY, Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Driver } from '../../models/adapters/driver.class';
import { DriverService } from '../services/driver.service';
import { NgSelectService } from '../../../../config/service/ng-select.service';
import { INgSelect } from '../../../../../@core/models/ng-select.model';
import { ToastService } from '../../../components/toasts/toasts.service';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DriverEditComponent implements OnInit, OnDestroy {

  public message: string;
  public driverForm: FormGroup;
  public title: string = 'Editar';
  public isCreate: boolean = false;
  public driver: Driver = {} as Driver;
  public subscription$: Subscription = new Subscription();
  public license$: Observable<INgSelect[]> = new Observable();

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _router: Router,
    private _form: FormBuilder,
    private _route: ActivatedRoute,
    private _toastService: ToastService,
    private _driverService: DriverService,
    private _ngSelectService: NgSelectService
  ) {
    this.initForm();
    this.initNgSelect();
  }

  get nameIsInvalid(): boolean {
    return this.driverForm.get('name')?.invalid && this.driverForm.get('name')?.touched;
  }

  get surnameIsInvalid(): boolean {
    return this.driverForm.get('surname')?.invalid && this.driverForm.get('surname')?.touched;
  }

  get emailIsInvalid(): boolean {
    return this.driverForm.get('email')?.invalid && this.driverForm.get('email')?.touched;
  }

  get dniIsInvalid(): boolean {
    return this.driverForm.get('dni')?.invalid && this.driverForm.get('dni')?.touched;
  }

  ngOnInit(): void {
    this.getDriverListById();
  }

  initForm(): void {
    this.driverForm = this._form.group({
      name: [''],
      surname: [''],
      email: [''],
      dni: ['', Validators.required],
      license: [null],
      phone: ['']
    });
  }

  initNgSelect(): void {
    this.license$ = this._ngSelectService.getselectLicenseCategory();
  }

  getDriverListById(): void {
    this.subscription$.add(
      this._route.params.pipe(
        switchMap(params => {
          if (!params['id']) {
            this.title = 'Añadir';
            this.isCreate = true;

            return EMPTY;
          }

          return this._driverService.getDriverListById(params['id']);
        })
      ).subscribe({
        next: driver => {
          this.driver = driver;
          this.setForm();
        },
      })
    );
  }

  setForm(): void {
    this.driverForm.patchValue({
      name: this.driver.name,
      surname: this.driver.surname,
      email: this.driver.email,
      dni: this.driver.dni,
      license: this.driver.license.licenseCategory,
      phone: this.driver.mobilePhone
    })
  }

  submit() {
    if (this.driverForm.valid) {
      const driver: DriverResponseData = {
        dni: this.driverForm.get('dni')?.value,
        nombres: this.driverForm.get('name')?.value,
        apellidos: this.driverForm.get('surname')?.value,
        celular: this.driverForm.get('phone')?.value,
        correo: this.driverForm.get('email')?.value,
        breveteCategoryId: parseInt(this.driverForm.get('license')?.value.value)
      };


      if (this.isCreate) {
        this.subscription$.add(
          this._driverService.createDriver(driver).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.toast, 'Operación correcta');
              this.goToDriverList();
            }
          })
        );
      } else {
        this.subscription$.add(
          this._driverService.updateDriver(driver, this.driver.idDriver).subscribe({
            next: (response) => {
              this.message = response.message;
              this._toastService.showSuccess(this.toast, 'Operación correcta');
              this.goToDriverList();
            }
          })
        );
      }
    }
  }

  goToDriverList(): void {
    this._router.navigate(['/', 'apps', 'driver', 'driver-list']);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
