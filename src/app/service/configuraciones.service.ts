import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  url: string = 'https://localhost:44301/api/Configuraciones'
  usuario: object | any;

  constructor(
    private _http : HttpClient ,
    public dialog: MatDialog
  ) { }

  getConfiguraciones(sEntidad :string, sId: string): Observable<Response>{
      return this._http.get<Response>(this.url+"?sEntidad="+sEntidad+"&sId="+sId);
  }

  getGraficaCitas(): Observable<Response>
  {
    return this._http.get<Response>(this.url+'/Grafica_Citas'); 
  }

  getGraficaCitasDisponibles(codmed: string, feccit: string): Observable<Response>
  {
    console.log(feccit)
    return this._http.get<Response>(this.url+'/Grafica_Citas_Disponibles?codmed='+codmed+'&dFecha_Consulta='+feccit); 
  }
}
