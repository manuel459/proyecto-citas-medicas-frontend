import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { Medico } from 'src/app/models/medico';
import { ConfiguracionesService } from 'src/app/service/configuraciones.service';
import { CustomvalidationService } from 'src/app/service/customvalidation.service';
import {MedicosService}from 'src/app/service/medicos.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogmedico',
  templateUrl: './dialogmedico.component.html',
  styleUrls: ['./dialogmedico.component.css']
})
export class DialogmedicoComponent implements OnInit {

  // public nombre: string;
  // public sexo:string;
  // public nac: string;
  // public correo: string;
  // public pswd: string;
  // public dni: number| any;
  // public codes: string;
  // public idhor: string;
  public hide : boolean = true;
  public horarios: [] | any;
  public especialidades: [] | any;

  registerForm: FormGroup | any;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    public dialogRef: MatDialogRef<DialogmedicoComponent>,
    public medicoService: MedicosService,
    public configuracionesService :ConfiguracionesService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public medico :Medico
  ) { 
    if(this.medico !== null){
      // this.nombre = medico.nombre
      // this.sexo =medico.sexo,
      // this.nac = medico.nac,
      // this.correo = medico.correo,
      // this.pswd =medico.pswd,
      // this.dni =medico.dni,
      // this.codes = medico.codes,
      // this.idhor = medico.idhor
    }
    else{
    // this.nombre = "",
    // this.sexo = "",
    // this.nac = "",
    // this.correo = "",
    // this.pswd = "",
    // this.codes = "",
    // this.idhor = ""
    }  
  }


  ngOnInit(): void {
    if(this.medico == null){
    this.registerForm = this.fb.group({
      dni : ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      correo:['', [Validators.required, Validators.email]],
      pswd: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      nac: ['', Validators.required],
      sexo: ['', Validators.required],
      codes: ['', Validators.required],
      idhor: ['', Validators.required]
      // confirmPassword: ['', [Validators.required]],
    }
    // {
    //   validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    // }
    );}
    else
    {
      this.registerForm = this.fb.group({
        dni : [this.medico.dni,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
        nombre: [this.medico.nombre, [Validators.required, Validators.minLength(1)]],
        correo:[this.medico.correo, [Validators.required, Validators.email]],
        pswd: [this.medico.pswd, Validators.compose([Validators.required, this.customValidator.patternValidator()])],
        nac: [this.medico.nac, Validators.required],
        sexo: [this.medico.sexo, Validators.required],
        codes: [this.medico.codes, Validators.required],
        idhor: [this.medico.idhor, Validators.required]
        // confirmPassword: ['', [Validators.required]],
      }
      // {
      //   validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      // }
      );
    }

    this.getEspecialidad()
    this.getHorarios()
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

  close(){
    this.dialogRef.close();
  }

  getEspecialidad(){this.configuracionesService.getConfiguraciones('Especialidad', '').subscribe(response =>{this.especialidades = response.data})}

  getHorarios(){console.log(this.registerForm),this.configuracionesService.getConfiguraciones('Horario',this.registerForm.value.codes).subscribe(response => {this.horarios = response.data})}

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
            const medico: Medico ={nombre: this.registerForm.value.nombre, sexo:this.registerForm.value.sexo, nac:this.registerForm.value.nac,correo: this.registerForm.value.correo, pswd:this.registerForm.value.pswd, dni:this.registerForm.value.dni, codes:this.registerForm.value.codes,idhor: this.registerForm.value.idhor,codmed:'0'}
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
          const medico: Medico ={nombre: this.registerForm.value.nombre, sexo:this.registerForm.value.sexo, nac:this.registerForm.value.nac,correo: this.registerForm.value.correo, pswd:this.registerForm.value.pswd, dni:this.registerForm.value.dni, codes:this.registerForm.value.codes,idhor: this.registerForm.value.idhor, codmed:this.medico.codmed}
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
  console.log(this.hide)
  this.hide = !this.hide;
}


}


