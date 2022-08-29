import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFuel } from '@core/models/fuel.model';
import { IResponseList } from '@core/models/response.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FuelService } from '../services/fuel.service';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['../../table-styles/ngx-datatable-style.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuelComponent implements OnInit, OnDestroy {

  public fuel: FormControl;
  public ColumnMode = ColumnMode;
  public selectedOption: FormControl;

  public fuelList: IResponseList<IFuel> = {} as IResponseList<IFuel>;
  public itemSelected: IFuel | null;

  public fuelSubject$: Subject<void> = new Subject();
  public subscription$: Subscription = new Subscription();

  constructor(private _fuelService: FuelService) {
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

  getFuelTypes(): void {
    this.subscription$.add(
      this.fuelSubject$.pipe(
        switchMap(() => this._fuelService.getFuelTypes())
      ).subscribe(res => this.fuelList = res)
    );
    this.fuelSubject$.next();
  }

  submitForm(): void {
    if (this.fuelIsInvalid) return;

    this._fuelService.createType({ tipo_combustible: this.fuel.value }).subscribe({
      next: () => this.fuelSubject$.next()
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
