import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGenericList, Vehicle, VehicleAdapter, VehiclePost, VehicleResponse } from '../../models/adapters/driver.class';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly _url = EndpointsRoutes.vehicles;

  constructor(
    private _httpClient: HttpClient,
    private _adapter: VehicleAdapter
  ) { }

  /**
   * @description GET - Get the list of vehicles.
   * @returns listof vehicles
   */
  getVehicleList(): Observable<IGenericList<Vehicle>> {
    return this._httpClient.get<IGenericList<VehicleResponse>>(this._url).pipe(
      map((data) => ({
        data: data.data.map(resMap => this._adapter.adapt(resMap)),
        count: data.count
      }))
    );
  }

  /**
   * @description POST - Creates a new vehicle.
   * @param vehicle
   */
   createVehicle(vehicle: VehiclePost) {
    return this._httpClient.post(this._url, vehicle);
  }
}