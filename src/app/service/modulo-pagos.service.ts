import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ConsultarPagoCita } from '../Interfaces/ConsultarPagoCita';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { insertPago } from '../Interfaces/InsertPago';
import { MatDialog } from '@angular/material/dialog';


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
    return this._http.post<Response>(this.url, pago, httpOption);
  }
}
