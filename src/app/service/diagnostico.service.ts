import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ErrorsDiagnosticoComponent } from '../Errors/errors-diagnostico/errors-diagnostico.component';
import { ErrorsMedicoComponent } from '../Errors/errors-medico/errors-medico.component';
import { Diagnostico } from '../models/diagnostico';
import { diagnosticoReporte } from '../models/diagnosticoReporte';
import { Response } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {


  constructor(
    private _http : HttpClient ,
    public dialog: MatDialog,
  ) { }
  url: string = 'https://localhost:44301/api/Diagnostico/';

  add(diagnostico:Diagnostico): Observable<Response> {
    return this._http.post<Response>(this.url+("ConsultarDiagnostico"), diagnostico, httpOption).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        Swal.fire(
          {
            icon:'error',
            title: 'Ocurrió algo inesperado comunícate con el área de soporte.',
          }
        )
         return throwError(error.error.errors);
       })
    );
  }

  generarReporte(diagnostico:diagnosticoReporte): Observable<Response> {
    return this._http.post<Response>(this.url+("ReporteDiagnostico"), diagnostico, httpOption);
  }

  saveHistory(diagnostico:diagnosticoReporte): Observable<Response> {
    return this._http.post<Response>(this.url+("SaveHistoryMedic"), diagnostico, httpOption).pipe(
      retry(1),
       catchError((error: HttpErrorResponse) => {
        this.dialog.open(ErrorsDiagnosticoComponent,{
          data: {message: error.error.errors}         
        });
        console.log(error.error.errors)
         return throwError(error.error.errors);
       })
    );;
  }

}
