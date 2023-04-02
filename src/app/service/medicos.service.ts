import { HttpClient ,HttpErrorResponse,HttpEvent,HttpHandler,HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, Observable, throwError, retry,throwIfEmpty ,tap} from 'rxjs';
import { Response } from 'src/app/models/response';
import {Medico} from 'src/app/models/medico';
import { ErrorsMedicoComponent } from '../Errors/errors-medico/errors-medico.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import { Router } from '@angular/router';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  url: string = 'https://localhost:44301/api/Medicos/'
  usuario: object | any;

  constructor(
    private _http : HttpClient ,
    public dialog: MatDialog,
    private router: Router
  ) { }


  getMedicos(): Observable<Response>{
    this.usuario = JSON.parse(localStorage.getItem("usuario")!);
      console.log(this.usuario)
      return this._http.get<Response>(this.url+this.usuario.correoElectronico.toString()).pipe(tap(() => { },
      (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                  this.router.navigate(['/forbidden']);
              }
          }
      }));
  }


  add(medico:Medico): Observable<Response> {
    return this._http.post<Response>(this.url, medico, httpOption).pipe(
      retry(1),
       catchError((error: HttpErrorResponse) => {
       console.log(error.error.errors)
        this.dialog.open(ErrorsMedicoComponent,{
          data: {message: error.error.errors}         
        });
         return throwError(error.error.errors);
       })
    );
  }

  edit(medico:Medico): Observable<Response> {
    return this._http.put<Response>(this.url, medico, httpOption).pipe(
      retry(1),
       catchError((error: HttpErrorResponse) => {
       
        this.dialog.open(ErrorsMedicoComponent,{
          data: {message: error.error.errors}         
        });
         return throwError(error.error.errors);
       })
    );
  }

  delete(id: string): Observable<Response> {
    return this._http.delete<Response>(`${this.url}${id}`);
  }

  //Filters
  filters(medico:FilterGeneric): Observable<Response>{
    return this._http.post<Response>(this.url+'Filters', medico);
  }
  
}


