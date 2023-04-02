import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Diagnostico } from '../models/diagnostico';
import { diagnosticoReporte } from '../models/diagnosticoReporte';
import { DiagnosticoService } from '../service/diagnostico.service';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

  id:number;
  nombre: string;
  especialidad: string;
  nomp: string;
  fecct: string
  diagnostico:string;
  medicamentos:string;
  idcita : string;
  constructor(public diagnosticoService: DiagnosticoService) { 
      this.id = 0,
      this.nombre = "",
      this.especialidad = "",
      this.nomp = "",
      this.fecct = "",
      this.diagnostico = "",
      this.medicamentos = "",
      this.idcita = ""
    }

  ngOnInit(): void {
    
  }

  add()
  {
    const diagnostico:Diagnostico ={dni:this.id}
    this.diagnosticoService.add(diagnostico).subscribe(response =>
      {
        try {
          if (response.exito === 1)
          {
             this.idcita = response.data.id,
             this.nombre=response.data.nombre,
             this.especialidad = response.data.nombEspecialidad,
             this.nomp = response.data.nomp,
             this.fecct = response.data.feccit
             console.log(response.data.nombre)
          }else 
          {
            console.log('llego')
            Swal.fire(
              response.mensaje,
              '',
              'question'
            )
          }
          
        } catch (error) {
          console.log(error)
        }
       
      });
  }

  generarReporte()
  {
    const diagnosticoReporte:diagnosticoReporte = 
    {id : this.id, idCita:this.idcita, nombre:this.nombre, especialidad:this.especialidad, nomp:this.nomp, fecct: this.fecct, diagnostico:this.diagnostico,
    medicamentos:this.medicamentos}
    this.diagnosticoService.generarReporte(diagnosticoReporte).subscribe(response =>
      {
        response.data;
      })
  }

  saveHistory()
  {
    const diagnosticoReporte:diagnosticoReporte = 
    {id : this.id, idCita:this.idcita,nombre:this.nombre, especialidad:this.especialidad, nomp:this.nomp, fecct: this.fecct, diagnostico:this.diagnostico,
    medicamentos:this.medicamentos}
    this.diagnosticoService.saveHistory(diagnosticoReporte).subscribe(response =>
      {
        if(response.exito === 1)
        {
          Swal.fire('Paciente atendido!',
          '',
          'success')
          this.refresh();
        }else
        {
          Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrio un error!'
            })
        }
      })
  }

  refresh()
  {
    this.id = 0,this.nombre = "",this.especialidad = "",
    this.nomp = "",this.fecct = "",this.diagnostico = "",
    this.medicamentos = "",this.idcita = ""
  }

}
