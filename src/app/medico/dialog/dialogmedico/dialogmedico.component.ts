import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { LocalStorageServiceService } from 'src/app/local-storage-service.service';
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
  public isEnabled: boolean = false;
  bActiveNotificaciones = false;
  newPasswordVar = false;
  registerForm: FormGroup | any;
  submitted = false;


  constructor
  (
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    public dialogRef: MatDialogRef<DialogmedicoComponent>,
    public medicoService: MedicosService,
    public configuracionesService :ConfiguracionesService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public medico :Medico,
    public localStorageService: LocalStorageServiceService
  ) 
  { 
    
  }


  ngOnInit(): void {
    this.isEnabled = this.localStorageService.getItem("usuario").idtip == "U002"?true: false; 
    if(this.medico == null)
    {
      this.registerForm = this.fb.group
      (
        {
          dni : ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
          nombre: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
          sApellidos:['', [Validators.required, Validators.minLength(1),Validators.pattern('^[a-zA-Z ]+$')]],
          correo:['', [Validators.required, Validators.email]],
          pswd: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
          nac: ['', Validators.required],
          sexo: ['', Validators.required],
          codes: ['', Validators.required],
          idhor: ['', Validators.required],
          nEstado:['']
        }
      );
    }
    else
    {

      if(this.newPasswordVar)
      {
        this.registerForm = this.fb.group
        (
          {
            dni :       [this.medico.dni,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
            nombre:     [this.medico.nombre, [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
            sApellidos: [this.medico.sApellidos , [Validators.required, Validators.minLength(1),Validators.pattern('^[a-zA-Z ]+$')]],
            correo:     [this.medico.correo, [Validators.required, Validators.email]],
            pswd:       [this.medico.pswd, Validators.compose([Validators.required, this.customValidator.patternValidator()])],
            nac:        [this.medico.nac , Validators.required],
            sexo:       [this.medico.sexo, Validators.required],
            codes:      [{value: this.medico.codes, disabled : this.isEnabled}, Validators.required],
            idhor:      [{value: this.medico.idhor, disabled : this.isEnabled}, Validators.required],
            nEstado:    [this.medico.nEstado]
          }
        );  
      }
      else
      {
        this.registerForm = this.fb.group
        (
          {
            dni :       [this.medico.dni,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
            nombre:     [this.medico.nombre, [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
            sApellidos: [this.medico.sApellidos , [Validators.required, Validators.minLength(1),Validators.pattern('^[a-zA-Z ]+$')]],
            correo:     [this.medico.correo, [Validators.required, Validators.email]],
            nac:        [this.medico.nac, Validators.required],
            sexo:       [this.medico.sexo, Validators.required],
            codes:      [{value: this.medico.codes, disabled : this.isEnabled}, Validators.required],
            idhor:      [{value: this.medico.idhor, disabled : this.isEnabled}, Validators.required],
            nEstado:    [this.medico.nEstado]
          }
        );
      }
      
    }

    this.getEspecialidad()
    this.getHorarios()
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
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

  getHorarios(){this.configuracionesService.getConfiguraciones('Horario', this.isEnabled? this.medico.codes: this.registerForm.value.codes).subscribe(response => {this.horarios = response.data})}

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
            const medico: Medico ={
              nombre: this.registerForm.value.nombre, sApellidos: this.registerForm.value.sApellidos, sexo: this.registerForm.value.sexo, nac: this.registerForm.value.nac, correo: this.registerForm.value.correo, pswd: this.registerForm.value.pswd, dni: this.registerForm.value.dni, codes: this.registerForm.value.codes, idhor: this.registerForm.value.idhor, bActiveNotificaciones: this.bActiveNotificaciones, codmed: '0',
              nEstado: 1
            }
            this.medicoService.add(medico).subscribe(response =>{
              if (response.exito===1){
                  this.dialogRef.close();
                  this.snackBar.open(response.mensaje,'',{
                      duration:2000
                  });
              }
              else
              {
                let ErrorMessage = '';
                if (response.errors != null || response.errors != undefined)
                  {
                    response.errors.forEach((element: { propertyName: string, errorMessage:string; }) => {
                      ErrorMessage += `<p style="color: red;" class="structureMessageError">${element.propertyName}: ${element.errorMessage}<p>`;
                    });
                  }

                  Swal.fire({
                  icon: 'error',
                  title: response.mensaje,
                  html: ErrorMessage,
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
          const medico: Medico ={
            nombre: this.registerForm.value.nombre, sApellidos: this.registerForm.value.sApellidos, sexo: this.registerForm.value.sexo, nac: this.registerForm.value.nac, correo: this.registerForm.value.correo, pswd: this.registerForm.value.pswd, dni: this.registerForm.value.dni, codes: this.isEnabled?this.medico.codes:this.registerForm.value.codes, idhor: this.isEnabled?this.medico.idhor:this.registerForm.value.idhor, codmed: this.medico.codmed, bActiveNotificaciones: this.bActiveNotificaciones,
            nEstado: this.registerForm.value.nEstado
          }
          this.medicoService.edit(medico).subscribe(response =>{
              if (response.exito===1){
                  this.dialogRef.close();
                  this.snackBar.open(response.mensaje,'',{
                      duration:2000
                  });
              }
              else
              {
                let ErrorMessage = '';
                if (response.errors != null || response.errors != undefined)
                  {
                    response.errors.forEach((element: { propertyName: string, errorMessage:string; }) => {
                      ErrorMessage += `<p style="color: red;" class="structureMessageError">${element.propertyName}: ${element.errorMessage}<p>`;
                    });
                  }
                  Swal.fire({
                  icon: 'error',
                  title: response.mensaje,
                  html: ErrorMessage,
                })
              }
          });
        }
    });
  
}

myFunction() {
  this.hide = !this.hide;
}

newPassword(p_newPassword: boolean)
{
  this.newPasswordVar = p_newPassword;
  this.ngOnInit();
}


}


