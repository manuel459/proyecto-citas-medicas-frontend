import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errors-medico',
  templateUrl: './errors-medico.component.html',
  styleUrls: ['./errors-medico.component.css']
})
export class ErrorsMedicoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: 
  {
    message: 
    {
      Nombre:string,
      Dni:string, 
      Sexo:string, 
      Nac:string, 
      Correo:string, 
      Pswd:string, 
      Idhor:string, 
      Codes:string
    }
  }) { }

  ngOnInit(): void {
  }

}
