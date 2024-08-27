import { HttpClient ,HttpErrorResponse,HttpEvent,HttpHandler,HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, Observable, throwError, retry,throwIfEmpty ,tap} from 'rxjs';
import { Response } from 'src/app/models/response';
import {Medico} from 'src/app/models/medico';
import { MatDialog } from '@angular/material/dialog';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import { Router } from '@angular/router';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.dev';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  url: string = `${environment.env}Medicos/`;
  usuario: object | any;

  constructor(
    private _http : HttpClient ,
    public dialog: MatDialog,
    private router: Router
  ) { }

  //GET
  getMedicos(request: RequestGenericFilter): Observable<Response>{
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario)
      return this._http.get<Response>(this.url+this.usuario.correoElectronico.toString()+'?numFilter='+request.numFilter+'&textFilter='+request.textFilter+'&sFilterOne='+request.sFilterOne
      +'&sFilterTwo='+request.sFilterTwo).pipe(tap(() => { },
      (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                  this.router.navigate(['/forbidden']);
              }
          }
      }));
  }

  add(medico:Medico): Observable<Response> {
    return this._http.post<Response>(this.url, medico, httpOption);
  }

  edit(medico:Medico): Observable<Response> {
    return this._http.put<Response>(this.url, medico, httpOption);
  }

  delete(id: string, nEstado: number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}${id}/${nEstado}`);
  }

  BusinessHours(Codmed: string): Observable<Response>{
    return this._http.get<Response>(this.url+'BusinessHours?Codmed='+Codmed);
  }
  
}


