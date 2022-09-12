import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription, Subject } from 'rxjs';
import { Driver } from '../../models/adapters/driver.class';
import { DriverService } from '../services/driver.service';
import { ToastService } from '../../../components/toasts/toasts.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DriverListComponent implements OnInit, OnDestroy {

  public message: string;
  public rows: Driver[];
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();
  public driverSubject$: Subject<void> = new Subject();

  @ViewChild('toast') toast: TemplateRef<any> | null;

  constructor(
    private _toastService: ToastService,
    private _driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.getDriverList();
  }

  getDriverList(): void {
    this.subscription$.add(
      this.driverSubject$.pipe(
        switchMap(() => this._driverService.getDriverList())
      ).subscribe(dataDriver => this.rows = dataDriver.data)
    );
    this.driverSubject$.next();
  }

  deleteDriver(idDriver: number): void {
    this.subscription$.add(
      this._driverService.deleteDriver(idDriver).subscribe({
        next: (response) => {
          this.message = response.message;
          this._toastService.showSuccess(this.toast, 'Operación exitosa');
          this.driverSubject$.next();
        },
        error: (response) => {
          this.message = response.error.message;
          this._toastService.showError(this.toast, 'Ocurrio un problema');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
