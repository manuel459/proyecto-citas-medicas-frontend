import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { Medico } from 'src/app/models/medico';
import { ConfiguracionesService } from 'src/app/service/configuraciones.service';
import {MedicosService}from 'src/app/service/medicos.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogmedico',
  templateUrl: './dialogmedico.component.html',
  styleUrls: ['./dialogmedico.component.css']
})
export class DialogmedicoComponent implements OnInit {

  public nombre: string;
  public sexo:string;
  public nac: string;
  public correo: string;
  public pswd: string;
  public dni: number| any;
  public codes: string;
  public idhor: string;
  public hide : boolean = true;
  public horarios: [] | any;
  public especialidades: [] | any;

  constructor(
    public dialogRef: MatDialogRef<DialogmedicoComponent>,
    public medicoService: MedicosService,
    public configuracionesService :ConfiguracionesService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public medico :Medico
  ) { 
    if(this.medico !== null){
      this.nombre = medico.nombre
      this.sexo =medico.sexo,
      this.nac = medico.nac,
      this.correo = medico.correo,
      this.pswd =medico.pswd,
      this.dni =medico.dni,
      this.codes = medico.codes,
      this.idhor = medico.idhor}
    else{
    this.nombre = "",
    this.sexo = "",
    this.nac = "",
    this.correo = "",
    this.pswd = "",
    this.codes = "",
    this.idhor = ""
    }  
  }

  ngOnInit(): void {
    this.getEspecialidad()
    this.getHorarios()
  }
  
  close(){
    this.dialogRef.close();
  }

  getEspecialidad(){this.configuracionesService.getConfiguraciones('Especialidad', '').subscribe(response =>{this.especialidades = response.data})}

  getHorarios(){this.configuracionesService.getConfiguraciones('Horario',this.codes).subscribe(response => {this.horarios = response.data})}

  addCliente(){

    Swal.fire({
      title: "Confirmación",
      text: "¿Realmente deseas guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar",
  })
      .then((result) => {
          if (result.isConfirmed) {
            const medico: Medico ={nombre: this.nombre, sexo:this.sexo, nac:this.nac,correo: this.correo, pswd:this.pswd, dni:this.dni, codes:this.codes,idhor: this.idhor,codmed:'0'}
            this.medicoService.add(medico).subscribe(response =>{
                if (response.exito===1){
                    this.dialogRef.close();
                    this.snackBar.open('Medico insertado con exito','',{
                        duration:2000
                    });
                }
            });
          }
      });
    
}


editCliente(){

  Swal.fire({
    title: "Confirmación",
    text: "¿Realmente deseas guardar los cambios?",
    icon: "warning",
    showCancelButton: true,
    focusCancel: true,
    confirmButtonText: "Si",
    cancelButtonText: "No, cancelar",
})
    .then((result) => {
        if (result.isConfirmed) {
          const medico: Medico ={nombre: this.nombre, sexo:this.sexo, nac:this.nac,correo: this.correo, pswd:this.pswd, dni:this.dni, codes:this.codes,idhor: this.idhor, codmed:this.medico.codmed}
          this.medicoService.edit(medico).subscribe(response =>{
              if (response.exito===1){
                  this.dialogRef.close();
                  this.snackBar.open('Medico editado con exito','',{
                      duration:2000
                  });
              }
          });
        }
    });
  
}

myFunction() {
  this.hide = !this.hide;
}


}
