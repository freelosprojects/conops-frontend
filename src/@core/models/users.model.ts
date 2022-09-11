export interface IUserResponse {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: {
    id_rol: number;
    rol: string;
  }
}

export interface IUser {
  idUser: number;
  name: string;
  email: string;
  rol: {
    idRol: number;
    rol: string;
  }
}

export interface IUserPost {
  nombre: string;
  correo: string;
  id_rol: number;
}