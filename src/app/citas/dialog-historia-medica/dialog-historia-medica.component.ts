import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-historia-medica',
  templateUrl: './dialog-historia-medica.component.html',
  styleUrls: ['./dialog-historia-medica.component.css']
})
export class DialogHistoriaMedicaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public lista:[{id: number,nomp:string,diagnostico: string,sNombre_Especialidad: string, sNombre_Medico:string, dnip:number, codes: string, codmed:string, receta:string, idCita:number, fecct:string}]) { }

  public i: number = 0;

  ngOnInit(): void {
    console.log(this.lista)
    console.log(this.lista.length)
    console.log(this.i)
  }

  next()
  {
    this.i = this.i + 1;
  }
  preview()
  {
    this.i = this.i - 1;
  }

}
