import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import {
  IStartTripPut,
  ITrip,
  ITripResponse,
  ITripSchedulePost,
  IWorkersByClient,
  IWorkersByClientResponse,
  ITripState,
  ICompleteTripPut,
  IPassangerTrip,
  IPassangerToAdd,
  ITripDetailResponse,
} from '../models/trip.model';
import { map } from 'rxjs/operators';
import {
  tripAdapter,
  tripWorkersByClientAdapter,
  passangerTripAdapter,
  tripDetailAdapter,
} from '../adapters/trip.adapter';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { IPassangerTripResponse, ITripDetail, IPassangerPut } from '../models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private _httpClient: HttpClient) {}

  getTripList(state: ITripState): Observable<IResponseList<ITrip>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('estado', state);

    return this._httpClient
      .get<IResponseList<ITripResponse>>(`${EndpointsRoutes.trip}`, { params: httpParams })
      .pipe(map((response) => ({ data: response.data.map((trip) => tripAdapter(trip)), count: response.count })));
  }

  getTripById(idTrip: number): Observable<ITripDetail> {
    return this._httpClient
      .get<ITripDetailResponse>(`${EndpointsRoutes.trip}/${idTrip}`)
      .pipe(map((response) => tripDetailAdapter(response)));
  }

  getWorkersByClient(id: number): Observable<IWorkersByClient> {
    return this._httpClient
      .get<IWorkersByClientResponse>(`${EndpointsRoutes.client}/${id}`)
      .pipe(map((response) => tripWorkersByClientAdapter(response)));
  }

  scheduleTrip(schedule: ITripSchedulePost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(`${EndpointsRoutes.trip}/programacion`, schedule);
  }

  startTrip(startTrip: IStartTripPut): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${EndpointsRoutes.trip}/iniciar`, startTrip);
  }

  completeTrip(completeTrip: ICompleteTripPut): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${EndpointsRoutes.trip}/finalizar`, completeTrip);
  }

  addPassangerInTrip(passangerPost: IPassangerToAdd): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(`${EndpointsRoutes.trip}/pasajeros`, passangerPost);
  }

  getPassangerByDni(dni: string): Observable<IPassangerTrip> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('dni', dni);
    return this._httpClient
      .get<IPassangerTripResponse>(`${EndpointsRoutes.passangers}/by-dni`, { params: httpParams })
      .pipe(map((response) => passangerTripAdapter(response)));
  }

  updatePassanger(passangerToUpdate: IPassangerPut): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${EndpointsRoutes.trip}/pasajeros`, passangerToUpdate);
  }

  deletePassanger(id: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${EndpointsRoutes.trip}/pasajeros/${id}`);
  }
}
