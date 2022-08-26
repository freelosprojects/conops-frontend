import { ILicenseCategoryResponse, ILicenseCategory } from '../models/license-category.model';

export const licenseCategoryAdapter = (license: ILicenseCategoryResponse): ILicenseCategory => {
  return {
    idLicenseCategory: license.id_breveteCategory,
    licenseCategory: license.breveteCategory,
  };
};
