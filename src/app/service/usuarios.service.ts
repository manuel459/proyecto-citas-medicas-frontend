import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Response } from 'src/app/models/response';
import { Usuarios } from '../models/Usuarios';
const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  messageService: any;
  usuario: object | any;
  url: string = environment.env + 'Usuarios/';

  constructor(
    private _http : HttpClient,
    private router: Router
  ) {  }


  //GET
  getUsuarios(request: RequestGenericFilter): Observable<Response>{
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
  addUser(usuarios:Usuarios): Observable<Response> {
    return this._http.post<Response>(this.url, usuarios, httpOption);
  }

  //PUT
  editUser(usuarios:Usuarios): Observable<Response> {
    return this._http.put<Response>(this.url, usuarios, httpOption);
  }

  //DELETE
  deleteUser(id: number): Observable<Response> {
    return this._http.delete<Response>(`${this.url}${id}`);
  }
}
