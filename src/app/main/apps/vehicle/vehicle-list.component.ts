import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Vehicle } from '../models/adapters/driver.class';
import { VehicleService } from './services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleListComponent implements OnInit, OnDestroy {

  public rows: Vehicle[];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public subscription$: Subscription = new Subscription();

  constructor(private _vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicleList();
  }

  getVehicleList(): void {
    this.subscription$.add(
      this._vehicleService.getVehicleList().subscribe(vehicleData => {
        this.rows = vehicleData.data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
