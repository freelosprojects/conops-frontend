import { ISelectEntity } from '../models/select-entity.model';
export const selectEntityAdapter = (id: number, value: string): ISelectEntity => {
  return {
    id: id,
    value: value,
  };
};
