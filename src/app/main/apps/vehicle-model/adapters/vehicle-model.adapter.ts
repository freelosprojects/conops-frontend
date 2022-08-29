import { IModel, IModelResponse } from '@core/models/vehicle-model.model';

export const vehicleModelAdapter = (model: IModelResponse): IModel => ({
    idModel: model.id_modelo,
    model: model.modelo
});