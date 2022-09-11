import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColor, IColorPost, IColorResponse } from '@core/models/color.model';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { colorAdapter } from '../adapters/color.adapter';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private readonly _url = EndpointsRoutes.colors;

  constructor(private _httpClient: HttpClient) {}

  getColorList(): Observable<IResponseList<IColor>> {
    return this._httpClient.get<IResponseList<IColorResponse>>(this._url).pipe(
      map((response) => ({
        count: response.count,
        data: response.data.map((color) => colorAdapter(color)),
      }))
    );
  }

  createColor(color: IColorPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, color);
  }

  putColor(color: IColorPost, id: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${id}`, color);
  }

  deleteColor(id: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${id}`);
  }
}
