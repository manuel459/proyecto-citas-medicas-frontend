import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-errors-paciente',
  templateUrl: './errors-paciente.component.html',
  styleUrls: ['./errors-paciente.component.css']
})
export class ErrorsPacienteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: {Nomp:string, Dnip:string , Numero:string, correoElectronico:string}}) { }

  ngOnInit(): void {
  }

}
