export interface IPostPassanger {
  dni: string;
  nombres: string;
  apellidos: string;
}

export interface IPutPassanger extends IPostPassanger {}

export interface IPassangerResponse {
  id_pasajero: number;
  dni: string;
  nombres: string;
  apellidos: string;
}

export interface IPassanger {
  idPassanger: number;
  dni: string;
  firstName: string;
  lastName: string;
}
