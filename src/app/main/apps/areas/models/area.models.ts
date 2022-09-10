export interface IAreaResponse {
  id_area: number;
  area: string;
  cliente: IClientAreaResponse;
}

export interface IClientAreaResponse {
  id_cliente: number;
  ruc: string;
  nombre: string;
  razon_social: string;
}

export interface IArea {
  idArea: number;
  area: string;
  cliente: IClientArea;
}

export interface IClientArea {
  idCliente: number;
  ruc: string;
  nombre: string;
  razonSocial: string;
}

export interface IPostArea {
  area: string;
  id_cliente: number;
}
