import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { IPostArea, IArea, IAreaResponse } from '../models/area.models';
import { map } from 'rxjs/operators';
import { areaAdapter } from '../adapters/area.adapter';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  constructor(private _http: HttpClient) {}

  getAreas(): Observable<IResponseList<IArea>> {
    return this._http.get<IResponseList<IAreaResponse>>(`${EndpointsRoutes.areas}`).pipe(
      map((response) => ({
        data: response.data.map((passanger) => areaAdapter(passanger)),
        count: response.count,
      }))
    );
  }

  postArea(area: IPostArea): Observable<IResponsePost> {
    return this._http.post<IResponsePost>(`${EndpointsRoutes.areas}`, area);
  }

  putArea(area: IPostArea, idArea: number): Observable<IResponsePost> {
    return this._http.put<IResponsePost>(`${EndpointsRoutes.areas}/${idArea}`, area);
  }

  deleteArea(idArea: number): Observable<IResponsePost> {
    return this._http.delete<IResponsePost>(`${EndpointsRoutes.areas}/${idArea}`);
  }
}
