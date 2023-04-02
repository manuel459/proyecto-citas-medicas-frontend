import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-deletemedico',
  templateUrl: './deletemedico.component.html',
  styleUrls: ['./deletemedico.component.css']
})
export class DeletemedicoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeletemedicoComponent>) { }

  ngOnInit(): void {
  }

}
