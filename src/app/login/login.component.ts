import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { ConfiguracionesService } from '../service/configuraciones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide : boolean = true;

  public loginForm = this.formBuilder.group({
    CorreoElectronico: ['',Validators.required],
    Contraseña: ['',Validators.required]
});

  public sNombreRol: string = '';

  constructor(public apiauth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private conf: ConfiguracionesService) { }

  ngOnInit() {
  }

  login(){
    this.apiauth.login(this.loginForm.value).subscribe(response =>{
       if(response.exito === 1){
        this.conf.getConfiguraciones('Roles', response.data.idtip).subscribe(result => 
          {
            if(result.data[0] != undefined || result.data[0] != null)
            {
              this.sNombreRol = result.data[0].sDescripcion
            }
            this.router.navigate(['/']);
            this.snackBar.open('Bienvenido(a) '+this.sNombreRol+' '+response.data.nombre,'',{
            duration:2000})
          });
       }
    });
    }


    myFunction() {
      this.hide = !this.hide;
    }


}
