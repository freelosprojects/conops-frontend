export interface IWorkersByClientResponse {
  cliente: IClientResponseForWorkers;
}

export interface IClientResponse {
  id_cliente: number;
  ruc: string;
  nombre: string;
  razon_social: string;
}

export interface IClientTrip {
  idCliente: number;
  ruc: string;
  nombre: string;
  razonSocial: string;
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
}

export interface IWorker {
  idTrabajador: number;
  dni: string;
  nombres: string;
  apellidos: string;
}

export const TripState = ['0', '1', '2'] as const;

export type ITripState = typeof TripState[number];

export enum EnumTripState {
  'SCHEDULE' = '0',
  'STARTED' = '1',
  'COMPLETED' = '2',
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
  estado: typeof TripState[number];
  creado_por: string;
  viajes_detalle: IDetailTrip[];
}

export interface ITripSchedulePost {
  fecha: string;
  id_conductor: number;
  id_cliente: number;
  id_vehiculo: number;
  origen: string;
  destino: string;
  salida: boolean;
  estado: typeof TripState[number];
  creado_por: string;
}

export interface IStartTripPut {
  id_viaje_cabecera: number;
  hora_inicio: string;
  km_inicio: number;
}

export interface ICompleteTripPut {
  id_viaje_cabecera: number;
  hora_fin: string;
  km_fin: number;
}

export interface IAreaTrip {
  idArea: number;
  area: string;
}

export interface IAreaTripResponse {
  id_area: number;
  area: string;
}

type ITripDetaiPassangersResponse = IPassangerTripResponse & { id_viaje_detalle: number; area: IAreaTripResponse };

export type ITripDetailPassangers = {
  idViajeDetalle: number;
  area: IAreaTrip;
  pasajero: IPassanger;
};

export interface ITripDetailResponse {
  id_viaje_cabecera: number;
  cliente: IClientResponse;
  vehiculo: {
    pasajeros: number;
  };
  viajes_detalle?: ITripDetaiPassangersResponse[];
}

export interface ITripDetail {
  idViajeCabecera: number;
  cliente: IClient;
  maxPasajeros: number;
  viajesDetalle?: ITripDetailPassangers[];
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
  client: IClientTrip;
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
}

export interface IDriver {
  nombres: string;
  apellidos: string;
}

export interface IVehicle {
  placa: string;
  pasajeros: number;
}

export interface IPassangerTripResponse {
  pasajero: {
    id_pasajero: number;
    dni: string;
    nombres: string;
    apellidos: string;
  };
}

export interface IPassangerTrip {
  pasajero: IPassanger;
}

export interface IPassanger {
  idPasajero: number;
  dni: string;
  nombres: string;
  apellidos: string;
}

export interface IPassangerGrid {
  idPassanger: number;
  names: string;
  area: string;
  dni: string;
}

export interface IPassangerToAdd {
  id_viaje: number;
  viaje_detalle: IDetailTrip;
}

export interface IDetailTrip {
  id_pasajero: number;
  id_area: number;
}

export interface IPassangerPut {
  id_viaje_detalle: number;
  id_area: number;
}
