import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponsePost } from '@core/models/response.model';
import { DriverResponseData } from '@fake-db/invoice.data';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Driver, DriverAdapter, IGenericList } from '../../models/adapters/driver.class';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private readonly _url = EndpointsRoutes.driver;

  constructor(
    private _httpClient: HttpClient,
    private _adapter: DriverAdapter
  ) { }

  /**
   * @description GET.
   * @returns List of drivers.
   */
  getDriverList(): Observable<IGenericList<Driver>> {
    return this._httpClient.get<IGenericList<DriverResponseData>>(this._url).pipe(
      map((data) => ({
        data: data.data.map(resMap => this._adapter.adapt(resMap)),
        count: data.count
      }))
    );
  }

  /**
   * @description GET - Search driver by ID.
   * @param idDriver
   * @returns Drivers.
   */
  getDriverListById(idDriver: number): Observable<Driver> {
    return this._httpClient.get<DriverResponseData>(`${this._url}/${idDriver}`).pipe(
      map(driver => this._adapter.adapt(driver['conductor']))
    );
  }

  /**
   * @description POST - Creates a new driver.
   * @param driver
   */
  createDriver(driver: DriverResponseData): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, driver);
  }

  /**
   * @description PUT - Updates an existent driver.
   * @param driver
   * @param idDriver
   */
  updateDriver(driver: DriverResponseData, idDriver: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${idDriver}`, driver);
  }

  /**
   * @description DELETE - Deletes an existent driver.
   * @param driver
   */
  deleteDriver(idDriver: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${idDriver}`);
  }
}