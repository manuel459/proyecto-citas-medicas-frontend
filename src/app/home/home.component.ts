import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombreUsuario: string | any;
  today : Date | any;
  constructor() 
  { 
    var user = JSON.parse(localStorage.getItem("usuario")!);
    this.nombreUsuario = user.nombre
  }

  ngOnInit(): void {
    this.today = moment().format('dddd, DD [de] MMMM [de] YYYY');
  }

}
