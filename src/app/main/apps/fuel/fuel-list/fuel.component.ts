import { Component, OnDestroy, OnInit, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFuel } from '@core/models/fuel.model';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastService } from 'app/main/components/toasts/toasts.service';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FuelService } from '../services/fuel.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FuelComponent implements OnInit, OnDestroy {
  public fuel: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public fuelList: IResponseList<IFuel> = {} as IResponseList<IFuel>;

  message: string;

  @ViewChild('toast') toast: TemplateRef<any> | null;

  public fuelSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  fuelSelected: IFuel | null;

  constructor(private _fuelService: FuelService, private _toastService: ToastService) {
    this.fuel = new FormControl(null, Validators.required);
    this.selectedOption = new FormControl(5);
  }

  get fuelIsValid(): boolean {
    return !this.fuel.invalid && this.fuel.touched;
  }

  get fuelIsInvalid(): boolean {
    return this.fuel.invalid && this.fuel.touched;
  }

  ngOnInit(): void {
    this.getFuelTypes();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getFuelTypes(): void {
    this.subscription$.add(
      this.fuelSubject$
        .pipe(switchMap(() => this._fuelService.getFuelTypes()))
        .subscribe((res) => (this.fuelList = res))
    );
    this.fuelSubject$.next();
  }

  submitForm(): void {
    if (this.fuelIsInvalid) return;

    if (!this.fuelSelected) {
      this._fuelService.createType({ tipo_combustible: this.fuel.value }).subscribe({
        next: (response) => {
          this.message = response.message;
          this.fuelSelected = null;
          this.fuel.reset();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.fuelSubject$.next();
        },
        error: (response) => {
          this.message = response.error.message;
          this._toastService.showError(this.toast, 'Ocurrio un problema');
        },
      });
    } else {
      this._fuelService.putType({ tipo_combustible: this.fuel.value }, this.fuelSelected.idFuelType).subscribe({
        next: (response) => {
          this.message = response.message;
          this.fuelSelected = null;
          this.fuel.reset();
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.fuelSubject$.next();
        },
        error: (response) => {
          this.message = response.error.message;
          this._toastService.showError(this.toast, 'Ocurrio un problema');
        },
      });
    }
  }

  edit(fuel: IFuel): void {
    this.fuelSelected = fuel;
    this.fuel.setValue(fuel.fuelType);
  }

  delete(id: number) {
    this._fuelService.deleteType(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.fuelSelected = null;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.fuelSubject$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }
}
