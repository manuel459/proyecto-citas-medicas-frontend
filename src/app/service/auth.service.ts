import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject,Observable, catchError ,retry, throwError} from 'rxjs';
import { Login, restorePassword } from '../models/login';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';
import { Response } from '../models/response';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.dev';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string = `${environment.env}Login/`;

private usuarioSubject: BehaviorSubject<Usuario>;
public usuario: Observable<Usuario>;

public get usuarioData(): Usuario{
    return this.usuarioSubject.value;
}

constructor(private _http: HttpClient,private snackBar: MatSnackBar){
this.usuarioSubject = 
new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
//Observable para notificar el estado del usuario
this.usuario = this.usuarioSubject.asObservable();
console.log(this.usuario)
}

login(login: Login):Observable<Response>{
    return this._http.post<Response>(this.url+'login', login, httpOption).pipe(
    map(res =>{
        if(res.exito === 1 ){
        const usuario: Usuario = res.data;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuarioSubject.next(usuario);
        }
        return res;
    }), 
    retry(1),
    catchError((error: HttpErrorResponse) => {
    console.log(error.error.mensaje)
    this.snackBar.open('Usuario o contraseña incorrecta','',{
    duration:2000})
      return throwError(error.error.mensaje);
    })
    );
}
logout(){

    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
}

  restorePassword(restore: restorePassword):Observable<Response>{
    return this._http.post<Response>(this.url+'restorePassword', restore, httpOption)
  }

}
