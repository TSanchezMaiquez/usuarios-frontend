import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';
import { Usuario } from '../model/usuarios.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit{
  modo: "NEW" | "UPDATE" = "NEW";
  userId?: number;
  usuario?: Usuario;
  emailRegex: string = "^[\\w-\\+]+(\\.[\\w-\\+]+)*@[a-zA-Z0-9]+(\\.[a-zA-Z0-9]+)*(\\.[a-zA-Z]{2,})$";

  
  constructor(private route: ActivatedRoute,
              private userService: UsuariosService,
              private toasts: ToastrService,
              private router: Router
  ){}

ngOnInit(): void {

  const entryParam: string = this.route.snapshot.paramMap.get("userId") ?? "new;"
    if (entryParam !== "new"){
        this.userId = + this.route.snapshot.paramMap.get("userId")!;
        this.modo = "UPDATE";
        this.getUserById(this.userId);
    }else {
      this.modo = "NEW";
      this.initializeUser();
    }
}
private getUserById(userId: number){
    this.userService.getUserById(userId).subscribe({
      next: (usuario) => {this.usuario = usuario},
      error: (err) => {this.handleError(err);}
    })
}

private initializeUser(): void{
this.usuario = new Usuario(undefined, "", "", "", "");
}

public saveUser(): void{
  if(this.modo ==="NEW"){
   
    this.insertarUsuario();
  }
  if (this.modo=== "UPDATE"){
   
    this.updateUsuario();
  }
} 
private insertarUsuario(): void{
  this.userService.insert(this.usuario!).subscribe({
    next: (usuarioInsertado) => {
      console.log(usuarioInsertado)
      this.toasts.success("Insertado correctamente");
      this.router.navigate(['/users']);
    },
    error: (err) => {this.handleError(err);}
  })
}
private updateUsuario(): void{
  this.userService.update(this.usuario!).subscribe({
    next: (usuarioModificado) => {
      this.toasts.success("Modificado correctamente");
      console.log(usuarioModificado)
      this.router.navigate(['/users']);
    },
    error: (err) => {this.handleError(err);}
  })
}
private handleError(err: any): void {
  console.log(err);
  this.toasts.success("No ha podido realizarse la operacion");
}

public volver(): void{
  this.router.navigate(['/users']);
}

}