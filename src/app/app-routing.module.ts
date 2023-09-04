import { NgModule } from '@angular/core';
//Colocar ruta para clinte y home
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { ForbiddenComponent } from './common-pages/forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MedicoComponent } from './medico/medico.component';
import { ModuloPagosComponent } from './modulo-pagos/modulo-pagos.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AuthGuard } from './security/auth.guard';
import { RolesYPermisosComponent } from './roles-y-permisos/roles-y-permisos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

const routes: Routes = [
    //crear los path
    {path: '', redirectTo : '/home',pathMatch: 'full'},
    {path:'home', component: HomeComponent ,canActivate:[AuthGuard]},
    {path:'medico', component: MedicoComponent ,canActivate:[AuthGuard]},
    {path:'paciente', component: PacienteComponent ,canActivate:[AuthGuard]},
    {path: 'citas', component: CitasComponent ,canActivate:[AuthGuard]},
    {path: 'rolesyPermisos', component: RolesYPermisosComponent, canActivate:[AuthGuard]},
    {path: 'Usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'pagos', component: ModuloPagosComponent },
    {path: 'RestorePassword', component: RestorePasswordComponent},
    {path:'login',component: LoginComponent},
    {path: 'forbidden',component: ForbiddenComponent},
  ];
  
  @NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  