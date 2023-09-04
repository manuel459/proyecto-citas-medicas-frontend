import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as moment from 'moment';
import { ConfiguracionesService } from '../service/configuraciones.service';
import { LocalStorageServiceService } from '../local-storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombreUsuario: string = '';
  sRolUsuario : string = '';
  today : Date | any;
  constructor(private conf: ConfiguracionesService, private localStorageService: LocalStorageServiceService) 
  { 
    var localStorage = this.localStorageService.getItem("usuario"); 
    this.nombreUsuario = localStorage.nombre;
    this.conf.getConfiguraciones('Roles', localStorage.idtip)
        .subscribe(result => 
                      { 
                        if(result.data[0] != undefined || result.data[0] != null)
                        {
                          this.sRolUsuario = result.data[0].sDescripcion
                        }
                        
                      });
  }

  ngOnInit(): void {
    this.today = moment().format('dddd, DD [de] MMMM [de] YYYY');
  }

}
