import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Driver } from '../../models/adapters/driver.class';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DriverListComponent implements OnInit, OnDestroy {

  public rows: Driver[];
  public selectedOption = 5;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();

  constructor(private _driverService: DriverService) {  }

  ngOnInit(): void {
    this.getDriverList();
  }

  getDriverList(): void {
    this.subscription$.add(
      this._driverService.getDriverList().subscribe(dataDriver => this.rows = dataDriver.data)
    );
  }

  deleteDriver(idDriver: number): void {
    this.subscription$.add(
      this._driverService.deleteDriver(idDriver).subscribe(res => console.log(res))
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
