import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { AuthService } from './service/auth.service';
import { ConfiguracionesService } from './service/configuraciones.service';
import { IconsService } from './service/icons.service';
import icWhatsapp from "@iconify/icons-fa-brands/whatsapp";
import { appIcons } from './icons';
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
  LIST_MODULE_CITAS: boolean = false;
  LIST_MODULE_PACIENTES: boolean = false;
  LIST_MODULE_USUARIOS: boolean = false;
  sesionActive: boolean = false;
  icWhatsapp = icWhatsapp;
  panelOpenState = false;
  constructor(public configuracionesService:ConfiguracionesService,public authService: AuthService ,
    private router: Router, iconService: IconsService){
      this.authService.usuario.subscribe(res =>{
        this.usuario = res;
        if(res.token != null || res.token != undefined ){
          this.sesionActive = true;
        }
        this.getPermiso();
        iconService.registerAll(appIcons)
      });
      console.log(this.sesionActive)
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
        this.LIST_MODULE_MEDICOS = this.permisos.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'LIST-MODULE-MEDICOS' || permiso.sDescripcion == 'LIST-MODULE-MEDICOS-INDIVIDUAL').length > 0;
        this.LIST_MODULE_CITAS = this.permisos.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'LIST-MODULE-NEWCITA' || permiso.sDescripcion == 'LIST-MODULE-NEWCITA-PACIENTES').length > 0;
        this.LIST_MODULE_PACIENTES = this.permisos.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'LIST-MODULE-PACIENTES' || permiso.sDescripcion == 'LIST-MODULE-PACIENTES-INDIVIDUAL').length > 0;
        this.LIST_MODULE_USUARIOS = this.permisos.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'LIST-MODULE-USUARIOS' || permiso.sDescripcion == 'LIST-MODULE-USUARIOS-INDIVIDUAL').length > 0;
      })
   }
  
}
