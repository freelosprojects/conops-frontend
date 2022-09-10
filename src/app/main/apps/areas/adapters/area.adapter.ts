import { IAreaResponse, IArea } from '../models/area.models';
export const areaAdapter = (areaResponse: IAreaResponse): IArea => ({
  idArea: areaResponse.id_area,
  area: areaResponse.area,
  cliente: {
    idCliente: areaResponse.cliente.id_cliente,
    nombre: areaResponse.cliente.nombre,
    razonSocial: areaResponse.cliente.razon_social,
    ruc: areaResponse.cliente.ruc,
  },
});
