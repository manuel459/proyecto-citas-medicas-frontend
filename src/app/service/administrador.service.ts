import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroMedico } from '../Interfaces/RegistroMedico';
import { ConsultaDni } from '../Interfaces/ConsultaDni';
import { Response } from 'src/app/models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  url: string = 'https://localhost:44301/api/PersonalMedik/'
  
  constructor(
    private _http : HttpClient 
  ) { }

  add(RegistroMedico:RegistroMedico): Observable<Response> {
    return this._http.post<Response>(this.url+'RegistroPersonal', RegistroMedico, httpOption);
  }

  getDni(ConsultaDni: ConsultaDni): Observable<Response>{
    return this._http.post<Response>(this.url+'DniPaciente', ConsultaDni,httpOption);
  }

  getEspecialidad(ConsultaDni: ConsultaDni): Observable<Response>{
    return this._http.post<Response>(this.url+'Especialidad', ConsultaDni, httpOption);
  }
}
