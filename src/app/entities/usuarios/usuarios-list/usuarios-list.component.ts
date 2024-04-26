import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuarios.model';
import { UsuariosService } from '../service/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent  implements OnInit{

  usuarios: Usuario[] = [];
  userIdToDelete?: number;

  page: number = 0;
  size: number = 5;
  sort: string = 'id,asc';

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  nameFilter?: string;
  firstnameFilter?: string;
  userRolFilter?: string;

  constructor(private usuarioService: UsuariosService, private toasts: ToastrService){}

  ngOnInit(): void {

    this.getAllUsers();

  
  }
  private buildFilters(): string | undefined{

    const filters: string[] = [];

    if (this.nameFilter){
      filters.push("nombre:MATCH:"+ this.nameFilter);
    }
    if (this.firstnameFilter){
      filters.push("apellidos:MATCH:"+ this.firstnameFilter);
    }
    if(this.userRolFilter){
      filters.push("rolUsuario:MATCH:"+ this.userRolFilter);
    }
    if(filters.length>0){
      return filters.join(',');
    }else{
      return undefined;
    }
  }

  private getAllUsers(): void{

    const filters: string | undefined = this.buildFilters();
    console.log(filters);

    this.usuarioService.getAllUsers(this.page, this.size, this.sort, filters, this.userRolFilter).subscribe({
      next: (data:any) => {
        this.usuarios = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => {this.handleError(err);}
    })
   
  }
 

  public prepareUserToDelete(userId: number): void{
    this.userIdToDelete = userId;
  }
public deleteUser(): void{
  if(this.userIdToDelete){
    this.usuarioService.deleteUser(this.userIdToDelete).subscribe({
      next: (data) => {
        this.toasts.success("Usuario eliminado");
        this.getAllUsers();
      },
      error: (err) => {this.handleError(err);}
    })
  }
 
}
public navegarSiguiente():void{
  this.page++;
  this.getAllUsers();
}

public navegarAnterior():void{
  this.page--;
  this.getAllUsers();
}

public searchByFilter(): void {
  this.getAllUsers();

}
  private handleError(error: any): void {
    console.log(error);
    this.toasts.success("No ha podido realizarse la operacion");

  }
}
