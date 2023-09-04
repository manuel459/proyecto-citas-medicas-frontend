import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { Response } from 'src/app/models/response';
import { Paciente } from '../models/paciente';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { Router } from '@angular/router';
const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url: string = 'https://localhost:44301/api/Paciente/'
  messageService: any;
  usuario: object | any;

  constructor(
    private _http : HttpClient,
    public dialog: MatDialog,
    private router: Router
  ) { }


  //GET
  getPacientes(request: RequestGenericFilter): Observable<Response>{
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

  //POST
  add(paciente:Paciente): Observable<Response> {
    return this._http.post<Response>(this.url, paciente, httpOption);
  }

  //PUT
  edit(paciente:Paciente): Observable<Response> {
    return this._http.put<Response>(this.url, paciente, httpOption);
  }

  //DELETE
  delete(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}${id}`);
  }
}


