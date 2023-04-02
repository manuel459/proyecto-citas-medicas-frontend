import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AprendiendoAngular';
  usuario!: Usuario ;
  
  constructor(public authService: AuthService ,
    private router: Router){
      this.authService.usuario.subscribe(res =>{
        this.usuario = res;
        console.log('cambio el objeto :'+res);
      });
    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);
   }
}
