import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { IVehicle } from '@core/models/vehicle.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription, Subject } from 'rxjs';
import { Vehicle } from '../models/adapters/driver.class';
import { VehicleService } from './services/vehicle.service';
import { ToastService } from '../../components/toasts/toasts.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleListComponent implements OnInit, OnDestroy {
  public message: string;
  public rows: IVehicle[];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();
  public vehicleSubject$: Subject<void> = new Subject();

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _toastService: ToastService,
    private _vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.getVehicleList();
  }

  getVehicleList(): void {
    this.subscription$.add(
      this.vehicleSubject$.pipe(
        switchMap(() => this._vehicleService.getVehicleList())
      ).subscribe(vehicleData => this.rows = vehicleData.data)
    );
    this.vehicleSubject$.next();
  }

  deleteClient(id: number): void {
    this._vehicleService.deleteVehicle(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this._toastService.showSuccess(this.toast, 'Operación exitosa');
        this.vehicleSubject$.next();
      },
      error: (response) => {
        this.message = response.error.message;
        this._toastService.showError(this.toast, 'Ocurrio un problema');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
