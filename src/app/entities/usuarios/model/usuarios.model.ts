import { RolUsuario } from './rolusuario.model';
export class Usuario {

    id: number | undefined;
    nombre: string;
    apellidos: string
    email: string;
    rolUsuario: string;

    constructor
    (
        id: number | undefined,
        nombre: string, 
        apellidos: string, 
        email: string, 
        rolUsuario: string
    ) 
    {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.rolUsuario = rolUsuario;
      }

}