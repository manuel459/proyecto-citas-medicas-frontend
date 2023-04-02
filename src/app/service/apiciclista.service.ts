import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Response } from '../models/response';
@Injectable({
  providedIn: 'root'
})
export class ApiciclistaService {

  url: string='https://localhost:44323/api/AuditMedikFacturas/AuditMedik';
  url2: string='https://localhost:44323/api/AuditMedikFacturas/ListarAuditMedik'
  request: string ='';
  constructor(
    private http: HttpClient
    
  ) { }

 getBicicleta(): Observable<Response>{
   return this.http.post<Response>(this.url,this.request);
 }

 getFacturas(): Observable<Response>{
  return this.http.get<Response>(this.url2);
}

}
