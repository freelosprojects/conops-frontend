import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { IUser, IUserPost, IUserResponse } from '@core/models/users.model';
import { IGenericList } from '../../models/adapters/driver.class';
import { map, tap } from 'rxjs/operators';
import { userAdapter } from '../adapters/user.adapter';
import { IResponsePost } from '@core/models/response.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  private readonly _url = EndpointsRoutes.users;

  constructor(private _httpClient: HttpClient) { }

  getUsers(): Observable<IGenericList<IUser>> {
    return this._httpClient.get<IGenericList<IUserResponse>>(this._url).pipe(
      map((response) => ({
        count: response.count,
        data: response.data.map(user => userAdapter(user))
      }))
    );
  }

  getUserByID(idUser: number): Observable<IUser> {
    return this._httpClient.get<IUserResponse>(`${this._url}/${idUser}`).pipe(
      map(user => userAdapter(user))
    );
  }

  createUser(user: IUserPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(`${EndpointsRoutes.auth}/registrar`, user);
  }

  updateUser(user: IUserPost, idUser: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${idUser}`, user);
  }

  deleteUser(idUser: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${idUser}`);
  }
}