import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletecitas',
  templateUrl: './deletecitas.component.html',
  styleUrls: ['./deletecitas.component.css']
})
export class DeletecitasComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletecitasComponent>) { }

  ngOnInit(): void {
  }

}
