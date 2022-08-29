import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFuel, IFuelPost, IFuelResponse } from '@core/models/fuel.model';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fuelAdapter } from '../adapters/fuel.adapter';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  private readonly _url = EndpointsRoutes.fuelType;

  constructor(private _httpClient: HttpClient) { }

  getFuelTypes(): Observable<IResponseList<IFuel>> {
    return this._httpClient.get<IResponseList<IFuelResponse>>(this._url).pipe(
      map(response => ({
        count: response.count,
        data: response.data.map(fuel => fuelAdapter(fuel))
      }))
    );
  }

  createType(brand: IFuelPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, brand);
  }
}