import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap} from 'rxjs';
import { Citas } from '../models/citas';
import { Response } from '../models/response'
import { ConsultaDni } from '../Interfaces/ConsultaDni';
import { Horario } from '../models/horarios';
import { Router } from '@angular/router';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CitasService {
  usuario: object | any;
  url :string = 'https://localhost:44301/api/CitasMedicas/' 
  constructor(
    private _http : HttpClient ,
    public dialog: MatDialog,
    private router: Router,) { }

    getCitas(request: RequestGenericFilter): Observable<Response>{
      this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      return this._http.get<Response>(this.url+this.usuario.correoElectronico.toString()+'?numFilter='+request.numFilter+'&textFilter='+request.textFilter+'&sFilterOne='+request.sFilterOne
                                      +'&sFilterTwo='+request.sFilterTwo+'&dFechaInicio='+request.dFechaInicio+'&dFechaFin='+request.dFechaFin).pipe(tap(() => { },
      (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                  this.router.navigate(['/forbidden']);
              }
          }
      }));
    }
  
    add(citas: Citas): Observable<Response> {
      return this._http.post<Response>(this.url, citas, httpOption);
    }
  
    edit(citas: Citas): Observable<Response> {
      return this._http.put<Response>(this.url, citas, httpOption);
    }
  
    delete(id: string): Observable<Response> {
      return this._http.delete<Response>(`${this.url}${id}`);
    }

    //Consultar DNI
    getDni(ConsultaDni: ConsultaDni): Observable<Response>{
      return this._http.post<Response>(this.url+'DniPaciente', ConsultaDni,httpOption);
    }

    getHorario(hora: Horario): Observable<Response>{
      return this._http.post<Response>(this.url+'Horario', hora, httpOption);
    }

    getHistoriaMedica(dnip: number): Observable<Response>
    {
      return this._http.get<Response>(this.url+'HistoricMedik/'+dnip);
    }
}

