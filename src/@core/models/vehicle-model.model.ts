import { IBrand, IBrandResponse } from "./brand.model";

export interface IModelResponse {
  id_modelo: number;
  modelo: string;
  marca: IBrandResponse;
}

export interface IModelByBrandResponse {
  id_modelo: number;
  modelo: string;
}

export interface IModel {
  idModel: number;
  model: string;
  brand: IBrand;
}

export interface IModelPost {
  modelo: string;
  id_marca: number;
}