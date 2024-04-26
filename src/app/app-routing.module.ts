import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuariosListComponent } from './entities/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './entities/usuarios/usuarios-form/usuarios-form.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "users", component: UsuariosListComponent}, 
  {path: "users/:userId", component: UsuariosFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
