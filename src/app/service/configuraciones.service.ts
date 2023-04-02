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
}
