import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DriverResponseData } from '@fake-db/invoice.data';
import { EMPTY, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Driver } from '../../models/adapters/driver.class';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  // styleUrls: ['./driver-edit.component.scss']
})
export class DriverEditComponent implements OnInit, OnDestroy {

  public title: string = 'Editar';
  public isCreate: boolean = false;
  public driver: Driver = {} as Driver;
  public subscription$: Subscription = new Subscription();

  @ViewChild('accountForm') accountForm: NgForm;

  constructor(
    private _route: ActivatedRoute,
    private _driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.getDriverListById();
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
      ).subscribe(driver => this.driver = driver)
    );
  }

  submit(form) {
    if (form.valid) {
      const driverForm = form.value;
      const driver: DriverResponseData = {
        dni: driverForm.dni,
        nombres: driverForm.name,
        apellidos: driverForm.surName,
        celular: driverForm.mobilePhone,
        correo: driverForm.email,
        breveteCategoryId: parseInt(driverForm.idLicenseCategory)
      };

      if (this.isCreate) {
        this.subscription$.add(
          this._driverService.createDriver(driver).subscribe(res => console.log(res))
        );
      } else {
        this.subscription$.add(
          this._driverService.updateDriver(driver, this.driver.idDriver).subscribe(res => console.log(res))
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
