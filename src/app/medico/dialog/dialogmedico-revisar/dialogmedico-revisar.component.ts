import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medico } from 'src/app/models/medico';
import { ConfiguracionesService } from 'src/app/service/configuraciones.service';

@Component({
  selector: 'app-dialogmedico-revisar',
  templateUrl: './dialogmedico-revisar.component.html',
  styleUrls: ['./dialogmedico-revisar.component.css']
})
export class DialogmedicoRevisarComponent implements OnInit {
  public nombre: string;
  public sexo:string;
  public nac: string;
  public correo: string;
  public pswd: string;
  public dni: number;
  public codes: string;
  public idhor: string;

  constructor( public dialogRef: MatDialogRef<DialogmedicoRevisarComponent>,

    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public medico :Medico, public configuracionesService: ConfiguracionesService) { 
    this.nombre = medico.nombre
    this.sexo =medico.sexo,
    this.nac = medico.nac,
    this.correo = medico.correo,
    this.pswd =medico.pswd,
    this.dni =medico.dni,
    this.codes = medico.codes,
    this.idhor = medico.idhor
    }

  ngOnInit(): void {

    this.getHorario()
    this.getEspecialidad()
    this.getSexo(this.medico.sexo);

  }

  getHorario(){this.configuracionesService.getConfiguraciones('Horario_idhor', this.idhor).subscribe(response =>{this.idhor = response.data[0].sDescripcion})}
  getEspecialidad(){this.configuracionesService.getConfiguraciones('Especialidad', '')
    .subscribe(response =>
      {
        this.codes = response.data.filter((response: { sId: string; }) => response.sId == this.medico.codes)[0].sDescripcion;
      })}

  getSexo(sexo: string)
  {
    switch (sexo) {
      case 'M':
        this.sexo = 'Masculino'
        break;
      case 'F':
        this.sexo = 'Femenino'
        break;
    }
  }

  close(){
    this.dialogRef.close();
}
  
}
