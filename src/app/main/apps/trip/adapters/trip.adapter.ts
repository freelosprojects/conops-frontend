import {
  IWorkersByClientResponse,
  IWorkersByClient,
  ITripResponse,
  ITrip,
  IPassangerTripResponse,
  IPassangerTrip,
  ITripDetailResponse,
  ITripDetail,
} from '../models/trip.model';

export const tripWorkersByClientAdapter = (response: IWorkersByClientResponse): IWorkersByClient => ({
  cliente: {
    idCliente: response.cliente.id_cliente,
    nombre: response.cliente.nombre,
    razonSocial: response.cliente.razon_social,
    ruc: response.cliente.ruc,
    // trabajadores: response.cliente.trabajadores.map((worker) => ({
    //   idTrabajador: worker.id_trabajador,
    //   apellidos: worker.apellidos,
    //   dni: worker.dni,
    //   nombres: worker.nombres,
    // })),
  },
});

export const tripAdapter = (response: ITripResponse): ITrip => ({
  client: {
    idCliente: response.cliente.id_cliente,
    nombre: response.cliente.nombre,
    razonSocial: response.cliente.razon_social,
    ruc: response.cliente.ruc,
  },
  vehicle: {
    pasajeros: response.vehiculo.pasajeros,
    placa: response.vehiculo.placa,
  },
  date: response.fecha,
  createdBy: response.creado_por,
  driver: {
    nombres: response.conductor.nombres,
    apellidos: response.conductor.apellidos,
  },
  start: response.origen,
  end: response.destino,
  startHour: response.hora_inicio,
  endHour: response.hora_fin,
  startKm: response.km_inicio,
  endKm: response.km_fin,
  isTripStart: response.salida,
  idTrip: response.id_viaje_cabecera,
  state: response.estado,
});

export const passangerTripAdapter = (passangerResponse: IPassangerTripResponse): IPassangerTrip => ({
  pasajero: {
    apellidos: passangerResponse.pasajero.apellidos,
    dni: passangerResponse.pasajero.dni,
    idPasajero: passangerResponse.pasajero.id_pasajero,
    nombres: passangerResponse.pasajero.nombres,
  },
});

export const tripDetailAdapter = (tripDetailResponse: ITripDetailResponse): ITripDetail => ({
  idViajeCabecera: tripDetailResponse.id_viaje_cabecera,
  cliente: {
    idCliente: tripDetailResponse.cliente.id_cliente,
    nombre: tripDetailResponse.cliente.nombre,
    razonSocial: tripDetailResponse.cliente.razon_social,
    ruc: tripDetailResponse.cliente.ruc,
  },
  maxPasajeros: tripDetailResponse.vehiculo.pasajeros,
  viajesDetalle: tripDetailResponse.viajes_detalle.map(({ area, id_viaje_detalle, pasajero }) => {
    return {
      idViajeDetalle: id_viaje_detalle,
      pasajero: {
        apellidos: pasajero.apellidos,
        dni: pasajero.dni,
        idPasajero: pasajero.id_pasajero,
        nombres: pasajero.nombres,
      },

      area: {
        idArea: area.id_area,
        area: area.area,
      },
    };
  }),
});
