import { IVehicle, IVehicleResponse } from '@core/models/vehicle.model';

export const vehicleAdapter = (vehicle: IVehicleResponse): IVehicle => ({
  idVehicle: vehicle.id_vehiculo,
  plate: vehicle.placa,
  passenger: vehicle.pasajeros,
  brand: {
    idBrand: vehicle.marca.id_marca,
    brand: vehicle.marca.marca
  },
  model: {
    idModel: vehicle.modelo.id_modelo,
    model: vehicle.modelo.modelo,
    brand: {
      idBrand: vehicle.marca.id_marca,
      brand: vehicle.marca.marca
    }
  },
  color: {
    idColor: vehicle.color.id_color,
    color: vehicle.color.color
  },
  vehicleType: {
    idVehicleType: vehicle.tipo_vehiculo.id_tipo_vehiculo,
    vehicleType: vehicle.tipo_vehiculo.tipo_vehiculo
  },
  licenseCategory: {
    idLicenseCategory: vehicle.brevete_categoria.id_breveteCategory,
    licenseCategory: vehicle.brevete_categoria.breveteCategory
  },
  fuelType: {
    idFuelType: vehicle.tipo_combustible.id_tipo_combustible,
    fuelType: vehicle.tipo_combustible.tipo_combustible
  },
});