import { IColor, IColorResponse } from "@core/models/color.model";

export const colorAdapter = (color: IColorResponse): IColor => ({
  idColor: color.id_color,
  color: color.color
});