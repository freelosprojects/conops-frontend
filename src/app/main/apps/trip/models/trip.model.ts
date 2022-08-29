export interface IWorkersByClientResponse {
  cliente: IClientResponseForWorkers;
}

export interface IClientResponse {
  id_cliente: number;
  ruc: string;
  nombre: string;
  razon_social: string;
}

export interface IClientResponseForWorkers extends IClientResponse {
  trabajadores: IWorkerResponse[];
}

export interface IWorkerResponse {
  id_trabajador: number;
  dni: string;
  nombres: string;
  apellidos: string;
}

export interface IWorkersByClient {
  cliente: IClient;
}

export interface IClient {
  idCliente: number;
  ruc: string;
  nombre: string;
  razonSocial: string;
  trabajadores: IWorker[];
}

export interface IWorker {
  idTrabajador: number;
  dni: string;
  nombres: string;
  apellidos: string;
}

export const ITripState = [0, 1, 2] as const;

export interface IWorkerPost {
  id_trabajador: number;
  id_area: number;
}

export interface ITripPost {
  fecha: string;
  id_conductor: number;
  id_cliente: number;
  id_vehiculo: number;
  origen: string;
  destino: string;
  km_inicio: number;
  km_fin: number;
  hora_inicio: string;
  hora_fin: string;
  salida: boolean;
  estado: typeof ITripState[number];
  creado_por: string;
  viajes_detalle: IWorkerPost[];
}

export interface ITripResponse {
  cliente: IClientResponse;
  conductor: IDriverResponse;
  creado_por: string;
  destino: string;
  estado: number;
  fecha: Date;
  hora_fin: Date;
  hora_inicio: Date;
  id_viaje_cabecera: number;
  km_fin: number;
  km_inicio: number;
  origen: string;
  salida: boolean;
  vehiculo: IVehicleResponse;
  // viajes_detalle: [{…}]
}

export interface IDriverResponse {
  nombres: string;
  apellidos: string;
}

export interface IVehicleResponse {
  placa: string;
  pasajeros: number;
}

export interface ITrip {
  client: string;
  driver: IDriver;
  createdBy: string;
  end: string;
  start: string;
  state: number;
  date: Date;
  endHour: Date;
  startHour: Date;
  idTrip: number;
  endKm: number;
  startKm: number;
  isTripStart: boolean;
  vehicle: IVehicle;
  // viajes_detalle: [{…}]
}

export interface IDriver {
  nombres: string;
  apellidos: string;
}

export interface IVehicle {
  placa: string;
  pasajeros: number;
}
