import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointsRoutes } from 'app/config/endpoint.config';
import {
  ISelectEntity,
  IClientSelectResponse,
  IDriverSelectResponse,
  IVehicleSelectResponse,
  IAreasSelectResponse,
} from '../models/select-entity.model';
import { IResponseList } from '@core/models/response.model';
import { map } from 'rxjs/operators';
import { selectEntityAdapter } from '../adapters/select-entity.adapter';

@Injectable({
  providedIn: 'root',
})
export class SelectEntityService {
  constructor(private _http: HttpClient) {}

  getClientSelect(): Observable<ISelectEntity[]> {
    return this._http
      .get<IResponseList<IClientSelectResponse>>(`${EndpointsRoutes.client}`)
      .pipe(
        map((response) =>
          response.data.map((item) => selectEntityAdapter(item.id_cliente, `${item.nombre} - ${item.razon_social}`))
        )
      );
  }

  getDriverSelect(): Observable<ISelectEntity[]> {
    return this._http
      .get<IResponseList<IDriverSelectResponse>>(`${EndpointsRoutes.driver}`)
      .pipe(
        map((response) =>
          response.data.map((item) => selectEntityAdapter(item.id_conductor, `${item.nombres} ${item.apellidos}`))
        )
      );
  }

  getVehiclesSelect(): Observable<ISelectEntity[]> {
    return this._http.get<IResponseList<IVehicleSelectResponse>>(`${EndpointsRoutes.vehicles}`).pipe(
      map((response) =>
        response.data.map((item) => {
          const value = item.tipo_vehiculo ? `${item.placa} - ${item.tipo_vehiculo.tipo_vehiculo}` : item.placa;
          return selectEntityAdapter(item.id_vehiculo, value);
        })
      )
    );
  }

  getAreasByClientSelect(id: number): Observable<ISelectEntity[]> {
    return this._http
      .get<IResponseList<IAreasSelectResponse>>(`${EndpointsRoutes.areas}/by-client/${id}`)
      .pipe(map((response) => response.data.map((item) => selectEntityAdapter(item.id_area, item.area))));
  }
}
