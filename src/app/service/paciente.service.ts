import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Response } from 'src/app/models/response';
import { ErrorsPacienteComponent } from '../Errors/errors-paciente/errors-paciente.component';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import { Paciente } from '../models/paciente';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';

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
  ) { }


  //GET
  getPacientes(request: RequestGenericFilter): Observable<Response>{
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
    return this._http.get<Response>(this.url+this.usuario.correoElectronico.toString()+'?numFilter='+request.numFilter+'&textFilter='+request.textFilter+'&sFilterOne='+request.sFilterOne
    +'&sFilterTwo='+request.sFilterTwo+'&dFechaInicio='+request.dFechaInicio+'&dFechaFin='+request.dFechaFin);
  }

  //POST
  add(paciente:Paciente): Observable<Response> {
    return this._http.post<Response>(this.url, paciente, httpOption).pipe(
      retry(1),
       catchError((error: HttpErrorResponse) => {
       
        this.dialog.open(ErrorsPacienteComponent,{
          data: {message: error.error.errors}         
        });
         return throwError(error.error.errors.Nomp);
       })
  );
  }

  //PUT
  edit(paciente:Paciente): Observable<Response> {
    return this._http.put<Response>(this.url, paciente, httpOption).pipe(
      retry(1),
       catchError((error: HttpErrorResponse) => {
       
        this.dialog.open(ErrorsPacienteComponent,{
          data: {message: error.error.errors}         
        });
         return throwError(error.error.errors.Nomp);
       })
  );
  }

  //DELETE
  delete(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}${id}`);
  }

  //FILE EXCEL
  fileExcel(lista: Array<any>): Observable<Response> {
    return this._http.post<Response>(this.url+'Excel', lista);
  }

  //Filters
  filters(paciente:FilterGeneric): Observable<Response>{
    return this._http.post<Response>(this.url+'Filters', paciente);
  }
}


