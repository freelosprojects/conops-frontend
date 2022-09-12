import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand, IBrandPost, IBrandResponse } from '@core/models/brand.model';
import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from 'app/config/endpoint.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { brandAdapter } from '../adapters/brand.adapter';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly _url = EndpointsRoutes.brand;

  constructor(private _httpClient: HttpClient) { }

  getBrandList(): Observable<IResponseList<IBrand>> {
    return this._httpClient.get<IResponseList<IBrandResponse>>(this._url).pipe(
      map(response => ({
        count: response.count,
        data: response.data.map(brand => brandAdapter(brand))
      }))
    );
  }

  createBrand(brand: IBrandPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, brand);
  }

  updateBrand(brand: IBrandPost, idBrand: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${idBrand}`, brand);
  }

  deleteBrand(idBrand: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${idBrand}`);
  }
}