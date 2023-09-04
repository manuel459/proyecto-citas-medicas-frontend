import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuarios } from 'src/app/models/Usuarios';
import { ConfiguracionesService } from 'src/app/service/configuraciones.service';
import { CustomvalidationService } from 'src/app/service/customvalidation.service';
import { UsuariosService } from 'src/app/service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrls: ['./dialog-usuarios.component.css']
})
export class DialogUsuariosComponent implements OnInit {
  hide = true;
  registerForm: FormGroup | any;
  submitted = false; 
  public lTipoUsuarios : [] | any; 
  newPasswordVar = false;

  constructor(
    private customValidator: CustomvalidationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUsuariosComponent>,
    public usuariosService: UsuariosService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public usuarios :Usuarios,
    public config: ConfiguracionesService
  ) { 
    }

  ngOnInit(): void {
    if(this.usuarios == null)
      {
        this.registerForm = this.fb.group({
          nDni : ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
          sNombres: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
          sApellidos: ['',[Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
          sSexo:['', [Validators.required]],
          dNac: ['', [Validators.required]],
          sCorreo: ['', Validators.email],
          sPswd: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
          nIptip: ['', Validators.required]
        })
      }
      else
      {
        console.log(this.newPasswordVar)
          this.registerForm = this.fb.group({
            nIdUser:[this.usuarios.nIdUser],
            nDni : [this.usuarios.nDni,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
            sNombres: [this.usuarios.sNombres, [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
            sApellidos: [this.usuarios.sApellidos,[Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z ]+$')]],
            sSexo:[this.usuarios.sSexo, [Validators.required]],
            dNac: [this.usuarios.dNac, [Validators.required]],
            sCorreo: [this.usuarios.sCorreo, Validators.email],
            sPswd: [this.usuarios.sPswd, Validators.compose([Validators.required, this.customValidator.patternValidator()])],
            nIptip: [this.usuarios.nIptip, Validators.required]
          })
          if(!this.newPasswordVar)
          {
            this.registerForm.removeControl('sPswd');
          }
      }
      this.getTipoUsuarios();
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

  addUsuario(){

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
            const usuario: Usuarios ={
              sNombres: this.registerForm.value.sNombres,
              sApellidos: this.registerForm.value.sApellidos,
              nDni: this.registerForm.value.nDni,
              sSexo: this.registerForm.value.sSexo,
              dNac: this.registerForm.value.dNac,
              sCorreo: this.registerForm.value.sCorreo,
              sPswd: this.registerForm.value.sPswd,
              nIptip: this.registerForm.value.nIptip,
              nIdUser: 0,
            }
            this.usuariosService.addUser(usuario).subscribe(response =>{
              if (response.exito===1)
              {
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


editUsuario(){

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
          const usuario: Usuarios ={
            sNombres: this.registerForm.value.sNombres,
            sApellidos: this.registerForm.value.sApellidos,
            nDni: this.registerForm.value.nDni,
            sSexo: this.registerForm.value.sSexo,
            dNac: this.registerForm.value.dNac,
            sCorreo: this.registerForm.value.sCorreo,
            sPswd: this.registerForm.value.sPswd,
            nIptip: this.registerForm.value.nIptip,
            nIdUser: this.registerForm.value.nIdUser,
          }
          this.usuariosService.editUser(usuario).subscribe(response =>{
            if (response.exito===1)
            {
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

  getTipoUsuarios(){this.config.getConfiguraciones('TipoUsuarios', '').subscribe(response =>{this.lTipoUsuarios = response.data})}

  myFunction() {
    this.hide = !this.hide;
  }

  newPassword(p_newPassword: boolean)
{
  this.newPasswordVar = p_newPassword;
  this.ngOnInit();
}

}
