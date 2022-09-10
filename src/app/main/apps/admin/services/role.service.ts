import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { roleAdapter } from '../adapters/role.adapter';
import { IPostRole, IRole, IRoleResponse } from '../models/rol.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _http: HttpClient) {}

  getRoles(): Observable<IResponseList<IRole>> {
    return this._http.get<IResponseList<IRoleResponse>>(`${EndpointsRoutes.roles}`).pipe(
      map((response) => ({
        data: response.data.map((passanger) => roleAdapter(passanger)),
        count: response.count,
      }))
    );
  }

  postRole(role: IPostRole): Observable<IResponsePost> {
    return this._http.post<IResponsePost>(`${EndpointsRoutes.roles}`, role);
  }

  putRole(role: IPostRole, idRole: number): Observable<IResponsePost> {
    return this._http.put<IResponsePost>(`${EndpointsRoutes.roles}/${idRole}`, role);
  }

  deleteRole(idRole: number): Observable<IResponsePost> {
    return this._http.delete<IResponsePost>(`${EndpointsRoutes.roles}/${idRole}`);
  }
}
