import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { restorePassword } from '../models/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  bOldPassword = true;
  bNewPassword = true;

  public restorePasswordForm = this.formBuilder.group({
    sEmail: ['',Validators.required],
    sOldPassword: ['',Validators.required],
    sNewPassword: ['',Validators.required]
});

  constructor( private formBuilder: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
  }

  myFunction(codigo: number) {

    switch(codigo)
    {
      case 1 : this.bOldPassword = !this.bOldPassword;
      break;
      case 2 : this.bNewPassword = !this.bNewPassword;
      break;
    }
  }

  restorePassword()
  {
    this.authService.restorePassword(this.restorePasswordForm.value).subscribe(response =>
      {
        if (response.exito===1){
          Swal.fire({
            icon: 'success',
            title: response.mensaje
          })
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
      })
  }

}
