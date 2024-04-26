import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  public getAllUsers(page: number, size:number, sort:string, filters?: string, userRolFilter?:string): Observable<Usuario[]>{
    let urlEndpoint = 'http://localhost:8080/usuarios/usuarios?page=' + page + '&size=' + size + '&sort=' + sort;
    if(filters){
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }

    if (userRolFilter) {
      urlEndpoint += "&rolUsuarioFiltro=" + userRolFilter;
    }
    return this.http.get<Usuario[]>(urlEndpoint);
  }

  public getUserById(userId: number): Observable<Usuario>{
    const urlEndpoint: string =  "http://localhost:8080/usuarios/usuarios/"+ userId;
    return this.http.get<Usuario>(urlEndpoint);

  }
  public insert(usuario: Usuario): Observable<Usuario>{
    let urlEndpoint: string =  "http://localhost:8080/usuarios/usuarios";
    return this.http.post<Usuario>(urlEndpoint, usuario);

  }
  public update(usuario: Usuario): Observable<Usuario>{
    let urlEndpoint: string =  "http://localhost:8080/usuarios/usuarios/"+ usuario.id;
    return this.http.patch<Usuario>(urlEndpoint, usuario);

  }

  public deleteUser(userId: number): Observable<any>{
    let urlEndpoint: string =  "http://localhost:8080/usuarios/usuarios/"+ userId;
    return this.http.delete<Usuario>(urlEndpoint);
  }
}
