export interface ISelectEntity {
  id: number;
  value: string;
}

export interface IClientSelectResponse {
  id_cliente: number;
  nombre: string;
  razon_social: string;
}

export interface IDriverSelectResponse {
  id_conductor: number;
  nombres: string;
  apellidos: string;
}

export interface IVehicleSelectResponse {
  id_vehiculo: number;
  placa: string;
  tipo_vehiculo: {
    id_tipo_vehiculo: number;
    tipo_vehiculo: string;
  };
}

export interface IAreasSelectResponse {
  id_area: number;
  area: string;
}
