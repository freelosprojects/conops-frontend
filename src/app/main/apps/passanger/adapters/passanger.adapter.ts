import { IPassanger, IPassangerResponse } from '../models/passanger.model';

export const passangerAdapter = (passanger: IPassangerResponse): IPassanger => ({
  dni: passanger.dni,
  firstName: passanger.nombres,
  idPassanger: passanger.id_pasajero,
  lastName: passanger.apellidos,
});
