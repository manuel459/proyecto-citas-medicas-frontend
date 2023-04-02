import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletepaciente',
  templateUrl: './deletepaciente.component.html',
  styleUrls: ['./deletepaciente.component.css']
})
export class DeletepacienteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletepacienteComponent>) { }

  ngOnInit(): void {
  }

}
