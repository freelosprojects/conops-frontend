import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { IVehicle, IVehiclePost, IVehicleResponse } from '@core/models/vehicle.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { vehicleAdapter } from '../adapters/vehicle.adapter';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly _url = EndpointsRoutes.vehicles;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /**
   * @description GET - Get the list of vehicles.
   * @returns listof vehicles
   */
  getVehicleList(): Observable<IResponseList<IVehicle>> {
    return this._httpClient.get<IResponseList<IVehicleResponse>>(this._url).pipe(
      map((response) => ({
        count: response.count,
        data: response.data.map(user => vehicleAdapter(user))
      }))
    );
  }

  getVehicleByID(idVehicle: number): Observable<IVehicle> {
    return this._httpClient.get<IVehicleResponse>(`${this._url}/${idVehicle}`).pipe(
      map((data) => vehicleAdapter(data['vehiculo']))
    );
  }

  /**
   * @description POST - Creates a new vehicle.
   * @param vehicle
   */
   createVehicle(vehicle: IVehiclePost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, vehicle);
  }

  updateVehicle(vehicle: IVehiclePost, idVehicle: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${idVehicle}`, vehicle);
  }

  deleteVehicle(idVehicle: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${idVehicle}`);
  }
}