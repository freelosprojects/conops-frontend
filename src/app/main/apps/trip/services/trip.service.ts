import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { ITrip, ITripPost, ITripResponse, IWorkersByClient, IWorkersByClientResponse } from '../models/trip.model';
import { map } from 'rxjs/operators';
import { tripAdapter, tripWorkersByClientAdapter } from '../adapters/trip.adapter';
import { IResponseList, IResponsePost } from '@core/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private _httpClient: HttpClient) {}

  getTripList(): Observable<IResponseList<ITrip>> {
    return this._httpClient
      .get<IResponseList<ITripResponse>>(`${EndpointsRoutes.trip}`)
      .pipe(map((response) => ({ data: response.data.map((trip) => tripAdapter(trip)), count: response.count })));
  }

  getWorkersByClient(id: number): Observable<IWorkersByClient> {
    return this._httpClient
      .get<IWorkersByClientResponse>(`${EndpointsRoutes.client}/${id}`)
      .pipe(map((response) => tripWorkersByClientAdapter(response)));
  }

  postTrip(trip: ITripPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(`${EndpointsRoutes.trip}`, trip);
  }
}
