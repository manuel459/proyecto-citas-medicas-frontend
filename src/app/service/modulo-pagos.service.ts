import { Injectable } from '@angular/core';
import { catchError, Observable, retry , throwError} from 'rxjs';
import { ConsultarPagoCita } from '../Interfaces/ConsultarPagoCita';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { insertPago } from '../Interfaces/InsertPago';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsPacienteComponent } from '../Errors/errors-paciente/errors-paciente.component';


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ModuloPagosService {

  constructor(
    private _http : HttpClient,
    public dialog: MatDialog,
  ) { }
  url: string = 'https://localhost:44301/api/Pagos/';

  getCita(pagoCita: ConsultarPagoCita): Observable<Response> {
    return this._http.get<Response>(this.url+pagoCita.idCita);
  }

  //POST
  insertPago(pago: insertPago): Observable<Response> {
    return this._http.post<Response>(this.url, pago, httpOption).pipe(
      retry(1),
       catchError((error: HttpErrorResponse) => {
       
        this.dialog.open(ErrorsPacienteComponent,{
          data: {message: error.error.errors}         
        });
         return throwError(error.error.errors.Nomp);
       })
  );
  }
}
