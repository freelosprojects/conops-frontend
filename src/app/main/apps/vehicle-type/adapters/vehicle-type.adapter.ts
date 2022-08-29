import { IVehicleType, IVehicleTypeResponse } from "@core/models/vehicle-type.model";

export const VehicleTypeAdapter = (vehicleType: IVehicleTypeResponse): IVehicleType => ({
    idVehicleType: vehicleType.id_tipo_vehiculo,
    vehicleType: vehicleType.tipo_vehiculo
});