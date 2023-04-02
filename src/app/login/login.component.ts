import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

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

  constructor(public apiauth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(){
    this.apiauth.login(this.loginForm.value).subscribe(response =>{
       if(response.exito === 1){
           this.router.navigate(['/']);
           this.snackBar.open('Bienvenido(a) '+response.data.nombre,'',{
            duration:2000})
       }
    });
    }


    myFunction() {
      this.hide = !this.hide;
    }

}
