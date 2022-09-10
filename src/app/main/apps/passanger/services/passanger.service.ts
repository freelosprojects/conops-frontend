import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { IPassangerResponse, IPostPassanger, IPassanger } from '../models/passanger.model';
import { map } from 'rxjs/operators';
import { passangerAdapter } from '../adapters/passanger.adapter';

@Injectable({
  providedIn: 'root',
})
export class PassangerService {
  constructor(private _http: HttpClient) {}

  getPassangers(): Observable<IResponseList<IPassanger>> {
    return this._http.get<IResponseList<IPassangerResponse>>(`${EndpointsRoutes.passangers}`).pipe(
      map((response) => ({
        data: response.data.map((passanger) => passangerAdapter(passanger)),
        count: response.count,
      }))
    );
  }

  postPassanger(passanger: IPostPassanger): Observable<IResponsePost> {
    return this._http.post<IResponsePost>(`${EndpointsRoutes.passangers}`, passanger);
  }
}
