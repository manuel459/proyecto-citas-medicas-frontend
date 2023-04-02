import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError ,retry, throwError, tap} from 'rxjs';
import { ErrorsMedicoComponent } from '../Errors/errors-medico/errors-medico.component';
import { Citas } from '../models/citas';
import { Response } from '../models/response'
import { ConsultaDni } from '../Interfaces/ConsultaDni';
import { Horario } from '../models/horarios';
import { ErrorsCitasComponent } from '../Errors/errors-citas/errors-citas.component';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import { FormArray, FormGroup } from '@angular/forms';
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
      return this._http.post<Response>(this.url, citas, httpOption).pipe(
        retry(1),
         catchError((error: HttpErrorResponse) => {
         console.log(error.error.errors)
          this.dialog.open(ErrorsCitasComponent,{
            data: {message: error.error.errors}         
          });
           return throwError(error.error.errors);
         })
      );
    }
  
    edit(citas: Citas): Observable<Response> {
      return this._http.put<Response>(this.url, citas, httpOption).pipe(
        retry(1),
         catchError((error: HttpErrorResponse) => {
         
          this.dialog.open(ErrorsCitasComponent,{
            data: {message: error.error.errors}         
          });
           return throwError(error.error.errors);
         })
      );
    }
  
    delete(id: string): Observable<Response> {
      return this._http.delete<Response>(`${this.url}${id}`);
    }

    //Consultar DNI
    getDni(ConsultaDni: ConsultaDni): Observable<Response>{
      return this._http.post<Response>(this.url+'DniPaciente', ConsultaDni,httpOption);
    }

    //Consultar Especialidad
    getEspecialidad(ConsultaDni: ConsultaDni): Observable<Response>{
      return this._http.post<Response>(this.url+'Especialidad', ConsultaDni, httpOption);
    }

    getHorario(hora: Horario): Observable<Response>{
      return this._http.post<Response>(this.url+'Horario', hora, httpOption);
    }

    getHorarioLaboral(Nombre: string): Observable<Response>{
      return this._http.get<Response>(this.url+'ConsultarDiasLaborable/'+Nombre);
    }

    getNombreMedico(codmed:string): Observable<Response>{
      return this._http.post<Response>(this.url+'NombreMedico',{codmed});
    }

    //FILE EXCEL
    fileExcel(lista: Array<any>): Observable<Response> {
       return this._http.post<Response>(this.url+'Excel', lista);
    }

    //FILE PDF
    getPdf(lista: Array<any>): Observable<Response>
    {
      return this._http.post<Response>(this.url+'GenerarPdf',lista);
    }

     //Filters
    filters(citas:FilterGeneric): Observable<Response>{
      return this._http.post<Response>(this.url+'Filters', citas);
    }
}

