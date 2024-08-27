import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Diagnostico } from '../models/diagnostico';
import { Response } from '../models/response';
import { DiagnosticoAdd } from '../Interfaces/DiagnosticoAdd';
import { environment } from 'src/environments/environment.dev';

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
  url: string =  `${environment.env}Diagnostico/`;

  saveHistory(diagnostico:DiagnosticoAdd, files: File[]): Observable<Response> {

    const formData = new FormData();
    formData.append('idCita', diagnostico.idCita); 
    formData.append('DniPaciente', diagnostico.DniPaciente.toString()); 
    formData.append('Codes', diagnostico.Codes); 
    formData.append('Codmed', diagnostico.Codmed); 
    formData.append('fecct', diagnostico.fecct); 
    formData.append('diagnostico', diagnostico.diagnostico); 
    formData.append('medicamentos', diagnostico.medicamentos); 

    console.log(files)
    Array.from(files).forEach(file => {
      formData.append('files', file, file.name); 
    });

    return this._http.post<Response>(this.url+("SaveHistoryMedic"), formData, httpOption);
  }

}
