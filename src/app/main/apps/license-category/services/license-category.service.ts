import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IResponseList, IResponsePost } from '@core/models/response.model';
import { EndpointsRoutes } from '../../../../config/endpoint.config';

import { ILicenseCategory, ILicenseCategoryPost, ILicenseCategoryResponse } from '../models/license-category.model';
import { licenseCategoryAdapter } from '../adapters/license-category.adapter';

@Injectable({
  providedIn: 'root',
})
export class LicenseCategoryService {
  private readonly _url = EndpointsRoutes.licenseCategory;

  constructor(private _httpClient: HttpClient) {}

  getLicenseCategories(): Observable<IResponseList<ILicenseCategory>> {
    return this._httpClient.get<IResponseList<ILicenseCategoryResponse>>(this._url).pipe(
      map(
        (response: IResponseList<ILicenseCategoryResponse>): IResponseList<ILicenseCategory> => ({
          count: response.count,
          data: response.data.map((item) => licenseCategoryAdapter(item)),
        })
      )
    );
  }

  postLicenseCategory(license: ILicenseCategoryPost): Observable<IResponsePost> {
    return this._httpClient.post<IResponsePost>(this._url, license);
  }

  putLicenseCategory(license: ILicenseCategoryPost, id: number): Observable<IResponsePost> {
    return this._httpClient.put<IResponsePost>(`${this._url}/${id}`, license);
  }

  deleteLicenseCategory(id: number): Observable<IResponsePost> {
    return this._httpClient.delete<IResponsePost>(`${this._url}/${id}`);
  }
}
