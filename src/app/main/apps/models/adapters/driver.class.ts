import { Injectable } from '@angular/core';
import { DriverResponseData } from '@fake-db/invoice.data';
import { Adapter } from '../interfaces/driver.adapter';

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

export class Vehicle {
  constructor(
    public plate: string,
    public passenger: number,
    public brand: IBrand,
    public model: IModel,
    public color: IColor,
    public vehicleType: IVehicleType,
    public licenseCategory: ILicenseCategory,
    public fuelType: IFuelType,
    public idVehicle?: number,
  ) { }
}

export interface VehicleResponse {
  id_vehiculo: number;
  placa: string;
  pasajeros: number;
  marca: IBrand;
  modelo: IModel;
  color: IColor;
  tipo_vehiculo: IVehicleType;
  brevete_categoria: ILicenseCategory;
  tipo_combustible: IFuelType;
}

export interface VehiclePost {
  placa: string;
  pasajeros: number;
  id_marca: number;
  id_modelo: number;
  id_color: number;
  id_tipo_vehiculo: number;
  id_brevete_categoria: number;
  id_tipo_combustible: number;
}

export interface IBrand {
  id_marca: number;
  marca: string;
}

export interface IModel {
  id_modelo: number;
  modelo: string;
}

export interface IColor {
  id_color: number;
  color: string; 
}

export interface IVehicleType {
  id_tipo_vehiculo: number;
  tipo_vehiculo: string;
}

export interface ILicenseCategory {
  id_breveteCategory: number;
  breveteCategory: string;
}

export interface IFuelType {
  id_tipo_combustible: number;
  tipo_combustible: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleAdapter implements Adapter<Vehicle> {
  adapt(item: VehicleResponse): Vehicle {
    return new Vehicle(
      item.placa,
      item.pasajeros,
      item.marca,
      item.modelo,
      item.color,
      item.tipo_vehiculo,
      item.brevete_categoria,
      item.tipo_combustible,
      item.id_vehiculo
    );
  }
}
