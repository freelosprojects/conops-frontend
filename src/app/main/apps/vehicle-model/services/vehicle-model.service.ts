import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { IModel, IModelPost, IModelResponse } from '@core/models/vehicle-model.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { vehicleModelAdapter } from '../adapters/vehicle-model.adapter';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {

  private readonly _url = EndpointsRoutes.models;

  constructor(private _httpClient: HttpClient) { }

  getModelList(): Observable<IResponseList<IModel>> {
    return this._httpClient.get<IResponseList<IModelResponse>>(this._url).pipe(
      map(response => ({
        count: response.count,
        data: response.data.map(model => vehicleModelAdapter(model))
      }))
    );
  }

  createModel(model: IModelPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, model);
  }

  updateModel(model: IModelPost, idModel: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${idModel}`, model);
  }

  deleteModel(idModel: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${idModel}`);
  }
}