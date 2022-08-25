import { Injectable } from "@angular/core";
import { DriverResponseData } from "@fake-db/invoice.data";
import { Adapter } from "../interfaces/driver.adapter";

export class Driver {
  constructor(
    public idDriver: number,
    public mobilePhone: string,
    public email: string,
    public dni: string | null,
    public name: string,
    public surname: string,
    public license: License
  ) { }
}

interface License {
  idLicenseCategory: number;
  licenseCategory: string 
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
    const StubLicense: License = {
      idLicenseCategory: item.breveteCategory.id_breveteCategory,
      licenseCategory: item.breveteCategory.breveteCategory
    };
    return new Driver(item.id_conductor, item.celular, item.correo, item.dni, item.nombres, item.apellidos, StubLicense);
  }
}

export class Client {
  constructor(
    public idClient: number,
    public ruc: string,
    public name: string,
    public businessName: string
  ) { }
}

export interface ClientResponse {
  id_cliente?: number;
  ruc: string;
  nombre: string;
  razon_social: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientAdapter implements Adapter<Client> {
  adapt(item: ClientResponse): Client {
    return new Client(item.id_cliente, item.ruc, item.nombre, item.razon_social);
  }
}
