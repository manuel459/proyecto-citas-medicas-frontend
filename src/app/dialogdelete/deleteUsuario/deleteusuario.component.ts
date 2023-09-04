import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-deleteusuario',
  templateUrl: './deleteusuario.component.html',
  styleUrls: ['./deleteusuario.component.css']
})
export class DeleteusuarioComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteusuarioComponent>) { }

  ngOnInit(): void {
  }

}
