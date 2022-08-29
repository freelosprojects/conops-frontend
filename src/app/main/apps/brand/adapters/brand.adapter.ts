import { IBrand, IBrandResponse } from "@core/models/brand.model";

export const brandAdapter = (brand: IBrandResponse): IBrand => ({
    idBrand: brand.id_marca,
    brand: brand.marca
});