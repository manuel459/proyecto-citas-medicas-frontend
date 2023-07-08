import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  // public nomp: string;
  // public dnip:number | any;
  // public numero: number | any;
  // public edad: number | any;
  // public correoElectronico: string;


  registerForm: FormGroup | any;
  submitted = false;  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogpacienteComponent>,
    public pacienteService: PacienteService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public paciente :Paciente
  ) { 
    if(this.paciente == null){
      this.registerForm = this.fb.group({
        dnip : ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{0,8}$/)]],
        nomp: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidos: ['',[Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
        numero:['', [Validators.required, Validators.maxLength(9), Validators.minLength(9),  Validators.pattern('^[0-9]*$')]],
        edad: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(3),Validators.pattern('^[0-9]*$')]],
        correoElectronico: ['', Validators.email],
      })
  }
  else
  {
      this.registerForm = this.fb.group({
        id:[paciente.id],
        dnip : [paciente.dnip,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
        nomp: [paciente.nomp, [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
        apellidos: [paciente.apellidos,[Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
        numero:[paciente.numero, [Validators.required, Validators.maxLength(9), Validators.minLength(9),  Validators.pattern('^[0-9]*$')]],
        edad: [paciente.edad, [Validators.required, Validators.minLength(1),Validators.maxLength(3),Validators.pattern('^[0-9]*$')]],
        correoElectronico: [paciente.correoElectronico, Validators.email],
      })
  }
    // if(this.paciente !== null)
    //   this.nomp = paciente.nomp,
    //   this.dnip = paciente.dnip,
    //   this.numero = paciente.numero,
    //   this.edad = paciente.edad,
    //   this.correoElectronico = paciente.correoElectronico
    // else 
    //   this.nomp ="",
    //   this.correoElectronico = ""
    }

  ngOnInit(): void {

}
  

  close(){
    this.dialogRef.close();
}

get registerFormControl() {
  return this.registerForm.controls;
}


onSubmit() {
  this.submitted = true;
  console.log(this.registerForm)
  if (this.registerForm.valid) {
    alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    console.table(this.registerForm.value);
  }
  else
  {
    alert('formulario invalido.');
  }
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
              nomp: this.registerForm.value.nomp,apellidos: this.registerForm.value.apellidos, dnip: this.registerForm.value.dnip, numero: this.registerForm.value.numero, idtip: '', edad: this.registerForm.value.edad, correoElectronico: this.registerForm.value.correoElectronico , id: 0
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
            nomp: this.registerForm.value.nomp,apellidos: this.registerForm.value.apellidos, dnip: this.registerForm.value.dnip, numero: this.registerForm.value.numero, idtip: '', edad: this.registerForm.value.edad, correoElectronico: this.registerForm.value.correoElectronico , id: this.registerForm.value.id
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
