import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import {ConsultaDni} from 'src/app/Interfaces/ConsultaDni'
import { TipoUsuario } from 'src/app/Interfaces/TipoUsuario';
import { AdministradorService } from 'src/app/service/administrador.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-administrador-registrar-nueva-cita',
  templateUrl: './administrador-registrar-nueva-cita.component.html',
  styleUrls: ['./administrador-registrar-nueva-cita.component.css']
})
export class AdministradorRegistrarNuevaCitaComponent implements OnInit {

 public dnip : number;
 public codes: string;
 public lst: any[] | undefined;
 public lst1: any;
 public lst3: any;
public lst4: any;
public nombre : any[] | undefined;
public array : any[]
  costo: any;
  arrayhora: Date | undefined;

 
  constructor(
    public dialogRef: MatDialogRef<AdministradorRegistrarNuevaCitaComponent>,
    public apiCliente: AdministradorService,
  ) { 
    this.dnip = 0;
    this.codes ="";
    this.array = [];
  }

  ngOnInit(): void {
  }

  getDni(){
    
    const ConsultaDni: ConsultaDni ={
      dnip: this.dnip,
      codes: this.codes
    }
   
    this.apiCliente.getDni(ConsultaDni).subscribe(response =>
      response.data == null? Swal.fire(
        'Paciente no registrado',
        'Dni no coincide',
        'question'
      ):
     
     this.lst = response.data.nomp
    
     );
      
     this.apiCliente.getDni(ConsultaDni).subscribe(response =>
      this.lst1 = response.data.numero);
    
  }

  getEspecialidad(){
    const ConsultaDni: ConsultaDni ={
      dnip: this.dnip,
      codes: this.codes
    }
    this.apiCliente.getEspecialidad(ConsultaDni).subscribe(response =>
      {

        response.data.forEach((element: any , index: any) => {
          this.array[index] = element.nombre
          this.costo = element.costo
          this.arrayhora = element.hinicio.value.ticks
          console.log(this.arrayhora)
      });

      })
  }


  close(){
    this.dialogRef.close();
  }

}
