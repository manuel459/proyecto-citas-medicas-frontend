import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { AuthService } from './service/auth.service';
import { ConfiguracionesService } from './service/configuraciones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AprendiendoAngular';
  usuario!: Usuario ;
  permisos: string[]|any;
  MODULE_DIAGNOSTICO: boolean = false;
  LIST_MODULE_MEDICOS: boolean = false;
  sesionActive: boolean = false;
  
  constructor(public configuracionesService:ConfiguracionesService,public authService: AuthService ,
    private router: Router){
      this.authService.usuario.subscribe(res =>{
        this.usuario = res;
        this.sesionActive = true;
        this.getPermiso();
      });
    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
      this.sesionActive = false;
   }

   getPermiso()
   {
    var correo = JSON.parse(localStorage.getItem("usuario")!);
    this.configuracionesService.getConfiguraciones('Permisos', correo.correoElectronico).subscribe( response => 
      {
        this.permisos = response.data
        this.MODULE_DIAGNOSTICO = this.permisos.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion.includes('MODULE-DIAGNOSTICO')).length > 0;
        this.LIST_MODULE_MEDICOS = this.permisos.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion.includes('LIST-MODULE-MEDICOS')).length > 0
      })
   }
  
}
