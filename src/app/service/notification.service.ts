import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { Response } from 'src/app/models/response';
import { GetNotificationResponseDto } from '../Interfaces/getNotificationResponseDto';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnectionBuilder: signalR.HubConnection | any;
  // public decodedToken: { nameid: string; actort: string; } | any;
  constructor(private _http : HttpClient,private router: Router) 
  {
    
  }
  // async ngOnInit(): Promise<void> {
  //   this.usuario = JSON.parse(localStorage.getItem("usuario")!);
  //   this.decodedToken = jwt_decode.jwtDecode(this.usuario.token);
  // }
  url: string = `${environment.env}Notification/`;
  // usuario: object | any;
  private listNotificationSubject = new BehaviorSubject<any[]>([]);
  public listNotification$ = this.listNotificationSubject.asObservable();



  public startConnection() {
    this.hubConnectionBuilder = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.envNoti}notificationHub`)
    .configureLogging(LogLevel.Information)
    .build();
  this.hubConnectionBuilder
    .start()
    .then(() => console.log('Connection started.......!'))
    .catch(() => console.log('Error while connect with server'));
  }

  public addNotificationListener(decodedToken: any) {
    return this.hubConnectionBuilder.on('ReceiveNotification', (event: any) => {
      console.log('Notification received:', event);
      const objectReceived: GetNotificationResponseDto = JSON.parse(event);

      switch(objectReceived.id_rol_receptor){
        case 'U002':
          if(objectReceived.id_medico_receptor === decodedToken.nameid){
            // Obtener la lista actual, agregar la nueva notificación y emitir el cambio
            const currentList = this.listNotificationSubject.value;
            const updatedList = [...currentList, objectReceived];
            this.listNotificationSubject.next(updatedList);
    
            console.log('Lista actualizada', updatedList);
          }
          break;
        default:
          if(objectReceived.id_user_receptor?.toString() === decodedToken.nameid){
            // Obtener la lista actual, agregar la nueva notificación y emitir el cambio
            const currentList = this.listNotificationSubject.value;
            const updatedList = [...currentList, objectReceived];
            this.listNotificationSubject.next(updatedList);
    
            console.log('Lista actualizada', updatedList);
          }
          break;
      }
      
    });
  }

  public setInitialNotifications(notifications: any[]) {
    this.listNotificationSubject.next(notifications);
  }

  public initializeNotifications(decodedToken: any) {
    this.getNotification(decodedToken).subscribe(response=> {
      if (response.exito === 1) {
        this.listNotificationSubject.next(response.data);
      }
    });
  }
  

  getNotification(decodedToken: any): Observable<Response>{
    return this._http.get<Response>(`${this.url}?id_user=${decodedToken.nameid}&&id_rol=${decodedToken.actort}`).pipe(tap(() => { },
    (err: any) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
                this.router.navigate(['/forbidden']);
            }
        }
    }));
  }
}
