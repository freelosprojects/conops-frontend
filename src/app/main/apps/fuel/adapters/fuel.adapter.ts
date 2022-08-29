import { IFuel, IFuelResponse } from '@core/models/fuel.model';

export const fuelAdapter = (fuel: IFuelResponse): IFuel => ({
    idFuelType: fuel.id_tipo_combustible,
    fuelType: fuel.tipo_combustible
});