import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { IVehicleType, IVehicleTypePost, IVehicleTypeResponse } from '@core/models/vehicle-type.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleTypeAdapter } from '../adapters/vehicle-type.adapter';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  private readonly _url = EndpointsRoutes.typeVehicles;

  constructor(private _httpClient: HttpClient) { }

  getVehicleTypeList(): Observable<IResponseList<IVehicleType>> {
    return this._httpClient.get<IResponseList<IVehicleTypeResponse>>(this._url).pipe(
      map(response => ({
        count: response.count,
        data: response.data.map(vehicleType => VehicleTypeAdapter(vehicleType))
      }))
    );
  }

  createVehicleType(vehicleType: IVehicleTypePost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, vehicleType);
  }
}