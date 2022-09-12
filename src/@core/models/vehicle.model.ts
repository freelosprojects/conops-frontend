import { IBrand, IBrandResponse } from './brand.model';
import { IVehicleType, IVehicleTypeResponse } from './vehicle-type.model';
import { IColor, IColorResponse } from './color.model';
import { IModel, IModelResponse } from './vehicle-model.model';
import { ILicenseCategory, ILicenseCategoryResponse } from '../../app/main/apps/license-category/models/license-category.model';
import { IFuel, IFuelResponse } from './fuel.model';

export interface IVehicleResponse {
  id_vehiculo: number;
  placa: string;
  pasajeros: number;
  marca: IBrandResponse;
  modelo: IModelResponse;
  color: IColorResponse;
  tipo_vehiculo: IVehicleTypeResponse;
  brevete_categoria: ILicenseCategoryResponse;
  tipo_combustible: IFuelResponse;
}

export interface IVehicle {
  idVehicle: number;
  plate: string;
  passenger: number;
  brand: IBrand;
  model: IModel;
  color: IColor;
  vehicleType: IVehicleType;
  licenseCategory: ILicenseCategory;
  fuelType: IFuel;
}

export interface IVehiclePost {
  placa: string;
  pasajeros: number;
  id_marca: number;
  id_modelo: number;
  id_color: number;
  id_tipo_vehiculo: number;
  id_brevete_categoria: number;
  id_tipo_combustible: number;
}
