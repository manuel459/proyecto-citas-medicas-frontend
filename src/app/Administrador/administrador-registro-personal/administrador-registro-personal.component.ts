import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import {RegistroMedico} from 'src/app/Interfaces/RegistroMedico'
import { AdministradorService } from 'src/app/service/administrador.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TipoUsuario } from 'src/app/Interfaces/TipoUsuario';
import { isNull } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-administrador-registro-personal',
  templateUrl: './administrador-registro-personal.component.html',
  styleUrls: ['./administrador-registro-personal.component.css']
})
export class AdministradorRegistroPersonalComponent implements OnInit {

  public Nombre: string;
  public Sexo:string;
  public Nac: any;
  public Correo: string;
  public Pswd: string;
  public Dni: any;
  public Codes: string;
  public Idtip: string;
  public Numero: string;
  tipoUsuarios: TipoUsuario[] = [
    {value: 'U001', viewValue: 'Administrador'},
    {value: 'U002', viewValue: 'Medico'},
    {value: 'U003', viewValue: 'Paciente'},
  ];

  constructor( 
    public dialogRef: MatDialogRef<AdministradorRegistroPersonalComponent>,
    public apiCliente: AdministradorService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public registroMedico :RegistroMedico
    ) { 
      this.Nombre =  "";
      this.Sexo = "";
      this.Nac = null;
      this.Correo = "";
      this.Pswd = "";
      this.Dni = null;
      this.Codes = "";
      this.Idtip = "";
      this.Numero = "";
    }

  ngOnInit(): void {
  }

  Tipo(Idtip:string)
  {
    this.Idtip
    console.log(this.Idtip)
  }

  save() {
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
                this.addMedico();
            }
        });
}

  addMedico(){
    const RegistroMedico: RegistroMedico ={Nombre: this.Nombre, Sexo:this.Sexo, Nac:this.Nac,Correo: this.Correo,Pswd:this.Pswd, Dni:this.Dni, Codes:this.Codes,Idtip: this.Idtip,Numero:this.Numero}
    this.apiCliente.add(RegistroMedico).subscribe(response =>{
        if (response.mensaje=='Medico registrado con exito' && this.Nombre != null && this.Nombre!=""){
            this.dialogRef.close();
            Swal.fire(
              'Medico insertado con exito!',
              '',
              'success'
            )
        }else if(response.mensaje=='Administrador registrado con exito' && this.Nombre != null && this.Nombre!="")
        {
          this.dialogRef.close();
            Swal.fire(
              'Administrador insertado con exito!',
              '',
              'success'
            ) 
        }else if(response.mensaje == 'Paciente registrado con exito'  && this.Nombre != null && this.Nombre!="")
        {
          this.dialogRef.close();
            Swal.fire(
              'Paciente insertado con exito!',
              '',
              'success'
            )
        }
        else
        {
          this.dialogRef;
            Swal.fire(
              'Debes rellenar todos los campos!',
              '',
              'error'
            )
        }
    });
}

close(){
  this.dialogRef.close();
}

}
