import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-dialog-usuarios-revisar',
  templateUrl: './dialog-usuarios-revisar.component.html',
  styleUrls: ['./dialog-usuarios-revisar.component.css']
})
export class DialogUsuariosRevisarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public usuarios :any) 
  {
    console.log(usuarios)
  }
 
  ngOnInit(): void {
  }

}
