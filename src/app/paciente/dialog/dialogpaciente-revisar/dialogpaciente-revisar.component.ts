import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-dialogpaciente-revisar',
  templateUrl: './dialogpaciente-revisar.component.html',
  styleUrls: ['./dialogpaciente-revisar.component.css']
})
export class DialogpacienteRevisarComponent implements OnInit {


        dnip: number;
        idtip : string;
        nomp : string;
        numero: number;
        edad: number;
        correoElectronico: string;
  constructor(public dialogRef: MatDialogRef<DialogpacienteRevisarComponent>,

    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public paciente :Paciente) {
      this.dnip = paciente.dnip,
      this.idtip = paciente.idtip,
      this.nomp = paciente.nomp,
      this.numero = paciente.numero,
      this.edad = paciente.edad,
      this.correoElectronico = paciente.correoElectronico
     }

  ngOnInit(): void {
  }

}
