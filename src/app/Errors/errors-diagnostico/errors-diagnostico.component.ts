import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errors-diagnostico',
  templateUrl: './errors-diagnostico.component.html',
  styleUrls: ['./errors-diagnostico.component.css']
})
export class ErrorsDiagnosticoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: 
  {
    message: 
    {
      diagnostico:string,
      medicamentos:string,
    }
  }) {
   }

  ngOnInit(): void {
    console.log(this.data.message.diagnostico)
  }
}
