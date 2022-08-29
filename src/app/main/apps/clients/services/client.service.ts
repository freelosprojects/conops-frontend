import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, ClientAdapter, ClientResponse, IGenericList } from '../../models/adapters/driver.class';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly _url = EndpointsRoutes.client;

  constructor(
    private _httpClient: HttpClient,
    private _adapter: ClientAdapter
  ) { }

  /**
   * @description GET.
   * @returns List of customers.
   */
  getClientList(): Observable<IGenericList<Client>> {
    return this._httpClient.get<IGenericList<ClientResponse>>(this._url).pipe(
      map((data) => ({
        data: data.data.map(resMap => this._adapter.adapt(resMap)),
        count: data.count
      }))
    );
  }

  /**
   * @description GET - Search client by ID.
   * @param idClient
   * @returns Clients.
   */
  getClientListById(idClient: number): Observable<Client> {
    return this._httpClient.get<ClientResponse>(`${this._url}/${idClient}`).pipe(
      map(driver => this._adapter.adapt(driver['cliente']))
    );
  }

  /**
   * @description POST - Creates a new customer.
   * @param client
   */
  createClient(client) {
    return this._httpClient.post(this._url, client);
  }

  /**
   * @description PUT - Updates an existent client.
   * @param client
   * @param idClient
   */
  updateClient(client: ClientResponse, idClient: number) {
    return this._httpClient.put(`${this._url}/${idClient}`, client);
  }

  /**
   * @description DELETE - Deletes an existent client.
   * @param idClient
   */
  deleteClient(idClient: number) {
    return this._httpClient.delete(`${this._url}/${idClient}`);
  }

  createPostData(myObject) {
    return this._httpClient.post(EndpointsRoutes.vehicles, myObject);
  }
}