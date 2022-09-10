import { IRole, IRoleResponse } from '../models/rol.model';

export const roleAdapter = (roleResponse: IRoleResponse): IRole => ({
  idRole: roleResponse.id_rol,
  role: roleResponse.rol,
});
