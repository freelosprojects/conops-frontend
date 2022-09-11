import { IUserResponse, IUser } from '@core/models/users.model';

export const userAdapter = (user: IUserResponse): IUser => ({
    idUser: user.id_usuario,
    name: user.nombre,
    email: user.correo,
    rol: {
        idRol: user.rol.id_rol,
        rol: user.rol.rol
    }
});