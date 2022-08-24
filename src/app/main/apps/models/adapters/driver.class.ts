import { Injectable } from "@angular/core";
import { DriverResponseData } from "@fake-db/invoice.data";
import { Adapter } from "../interfaces/driver.adapter";

export class Driver {
  constructor(
    public idDriver: number,
    public fullname: string,
    public mobilePhone: string,
    public email: string
  ) { }
}

export interface IGenericList<T> {
  data: T[],
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class DriverAdapter implements Adapter<Driver> {
  adapt(item: DriverResponseData): Driver {
    const fullName = `${item.nombres} ${item.apellidos}`;
    return new Driver(item.id_conductor, fullName, item.celular, item.correo);
  }
}
