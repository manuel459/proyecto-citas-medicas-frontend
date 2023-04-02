import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errors-citas',
  templateUrl: './errors-citas.component.html',
  styleUrls: ['./errors-citas.component.css']
})
export class ErrorsCitasComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: {Dnip:string,feccit:string, Codmed:string , Codes:string, Estado:string, Hora:string}}) { }

  ngOnInit(): void {
  }

}
