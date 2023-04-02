import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/service/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogpaciente',
  templateUrl: './dialogpaciente.component.html',
  styleUrls: ['./dialogpaciente.component.css']
})
export class DialogpacienteComponent implements OnInit {

  public nomp: string;
  public dnip:number | any;
  public numero: number | any;
  public edad: number | any;
  public correoElectronico: string;

  constructor(
    public dialogRef: MatDialogRef<DialogpacienteComponent>,
    public pacienteService: PacienteService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public paciente :Paciente
  ) { 
    if(this.paciente !== null)
      this.nomp = paciente.nomp,
      this.dnip = paciente.dnip,
      this.numero = paciente.numero,
      this.edad = paciente.edad,
      this.correoElectronico = paciente.correoElectronico
    else 
      this.nomp ="",
      this.correoElectronico = ""
    }

  ngOnInit(): void {
  }
  

  close(){
    this.dialogRef.close();
}


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
            const paciente: Paciente ={
              nomp: this.nomp, dnip: this.dnip, numero: this.numero, idtip: '', edad: this.edad, correoElectronico: this.correoElectronico  
            }
            this.pacienteService.add(paciente).subscribe(response =>{
                if (response.exito===1){
                    this.dialogRef.close();
                    this.snackBar.open('Paciente insertado con exito','',{
                        duration:2000
                    });
                }
                else
                {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.mensaje
                  })
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
          const paciente: Paciente ={
            nomp: this.nomp, dnip: this.dnip, numero: this.numero, idtip: '', edad: this.edad, correoElectronico: this.correoElectronico 
          }
          this.pacienteService.edit(paciente).subscribe(response =>{
              if (response.exito===1){
                  this.dialogRef.close();
                  this.snackBar.open('Paciente editado con exito','',{
                      duration:2000
                  });
              }
          });
        }
    });
  }
}
