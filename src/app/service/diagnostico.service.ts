import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Diagnostico } from '../models/diagnostico';
import { Response } from '../models/response';
import { DiagnosticoAdd } from '../Interfaces/DiagnosticoAdd';

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

  saveHistory(diagnostico:DiagnosticoAdd): Observable<Response> {
    return this._http.post<Response>(this.url+("SaveHistoryMedic"), diagnostico, httpOption);
  }

}
