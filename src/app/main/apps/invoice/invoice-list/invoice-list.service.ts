import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DriverResponse, DriverResponseData } from '@fake-db/invoice.data';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver, DriverAdapter, IGenericList } from '../../models/adapters/driver.class';

@Injectable()
export class InvoiceListService implements Resolve<any> {
  rows: any;
  onInvoiceListChanged: BehaviorSubject<DriverResponse>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient,
    private _adapter: DriverAdapter
  ) {
    // Set the defaults
    this.onInvoiceListChanged = new BehaviorSubject(<DriverResponse>{});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<DriverResponse> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<Promise<DriverResponse>>('api/invoice-data').subscribe((response) => {
        this.rows = response;
        this.onInvoiceListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getInvoiceResponse(): Observable<IGenericList<Driver>> {
    const url = 'http://localhost:3000/api/conductores';
    return this._httpClient.get<IGenericList<DriverResponseData>>(url).pipe(
      map((data) => ({
        data: data.data.map(resMap => this._adapter.adapt(resMap)),
        count: data.count
      }))
    );
  }
}
