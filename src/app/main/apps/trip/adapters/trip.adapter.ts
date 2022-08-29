import { IWorkersByClientResponse, IWorkersByClient, ITripResponse, ITrip } from '../models/trip.model';

export const tripWorkersByClientAdapter = (response: IWorkersByClientResponse): IWorkersByClient => ({
  cliente: {
    idCliente: response.cliente.id_cliente,
    nombre: response.cliente.nombre,
    razonSocial: response.cliente.razon_social,
    ruc: response.cliente.ruc,
    trabajadores: response.cliente.trabajadores.map((worker) => ({
      idTrabajador: worker.id_trabajador,
      apellidos: worker.apellidos,
      dni: worker.dni,
      nombres: worker.nombres,
    })),
  },
});

export const tripAdapter = (response: ITripResponse): ITrip => ({
  client: response.cliente.nombre,
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
