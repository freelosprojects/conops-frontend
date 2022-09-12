import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INgSelect } from '@core/models/ng-select.model';
import { IResponseList } from '@core/models/response.model';
import { ILicenseCategoryResponse } from 'app/main/apps/license-category/models/license-category.model';
import { IBrand, IColor, IFuelType, IModel, IVehicleType } from 'app/main/apps/models/adapters/driver.class';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EndpointsRoutes } from '../endpoint.config';
import { IRoleResponse } from '../../main/apps/admin/models/rol.model';
import { IModelResponse } from '@core/models/vehicle-model.model';

@Injectable({
  providedIn: 'root'
})
export class NgSelectService {

  constructor(private _httpClient: HttpClient) { }

  getBrand(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<IBrand>>(EndpointsRoutes.brand).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_marca, data.marca)))
    );
  }

  getModel(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<IModel>>(EndpointsRoutes.models).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_modelo, data.modelo)))
    );
  }

  getSelectModelByBrand(idBrand: number): Observable<INgSelect[]> {
    return this._httpClient.get<IModelResponse[]>(`${EndpointsRoutes.models}/marca/${idBrand}`).pipe(
      map(res => res['modelo'].map(data => this.transformToNgSelect(data.id_modelo, data.modelo)))
    );
  }

  getColor(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<IColor>>(EndpointsRoutes.colors).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_color, data.color)))
    );
  }

  getType(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<IVehicleType>>(EndpointsRoutes.typeVehicles).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_tipo_vehiculo, data.tipo_vehiculo)))
    );
  }

  getFuel(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<IFuelType>>(EndpointsRoutes.fuelType).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_tipo_combustible, data.tipo_combustible)))
    );
  }

  getselectLicenseCategory(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<ILicenseCategoryResponse>>(EndpointsRoutes.licenseCategory).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_breveteCategory, data.breveteCategory)))
    );
  }

  getSelectRoles(): Observable<INgSelect[]> {
    return this._httpClient.get<IResponseList<IRoleResponse>>(EndpointsRoutes.roles).pipe(
      map(res => res.data.map(data => this.transformToNgSelect(data.id_rol, data.rol)))
    );
  }

  transformToNgSelect(value: number, label: string): INgSelect {
    return { value, label }
  }
}