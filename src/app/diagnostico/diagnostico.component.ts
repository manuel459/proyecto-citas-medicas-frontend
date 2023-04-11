import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Diagnostico } from '../models/diagnostico';
import { diagnosticoReporte } from '../models/diagnosticoReporte';
import { DiagnosticoService } from '../service/diagnostico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  registerForm: FormGroup | any;
  // id:number;
  nombre: string;
  especialidad: string;
  nomp: string;
  fecct: string
  // diagnostico:string;
  // medicamentos:string;
  idcita : number;
  constructor( private fb: FormBuilder,public diagnosticoService: DiagnosticoService) { 
      // this.id = 0,
      this.nombre = "",
      this.especialidad = "",
      this.nomp = "",
      this.fecct = "",
      // this.diagnostico = "",
      // this.medicamentos = "",
      this.idcita = 0
        this.registerForm = this.fb.group({
          id: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
          // nombre : ['',[Validators.required]],
          // especialidad: ['', Validators.required],
          // nomp:['', [Validators.required]],
          // fecct: [''],
          diagnostico: ['', Validators.required],
          medicamentos: ['', Validators.required]
        }
        );
    }

  ngOnInit(): void {
    
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  add()
  {
    const diagnostico:Diagnostico ={dni:this.registerForm.value.id}
    this.diagnosticoService.add(diagnostico).subscribe(response =>
      {
        try {
          if (response.exito === 1)
          {
             this.idcita = response.data.id,
             this.nombre=response.data.nombre,
             this.especialidad = response.data.nombEspecialidad,
             this.nomp = response.data.nomp,
             this.fecct = response.data.feccit;
          }else 
          {
            console.log(this.registerForm.value.id)
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

  saveHistory()
  {
    const diagnosticoReporte:diagnosticoReporte = 
    {id : this.registerForm.value.id, idCita:this.idcita,nombre:this.nombre, especialidad:this.especialidad, nomp:this.nomp, fecct: this.fecct, diagnostico:this.registerForm.value.diagnostico,
    medicamentos:this.registerForm.value.medicamentos}
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
    this.registerForm.get('id').enable();
    this.registerForm.reset();
    this.nombre = "", this.especialidad = "",
    this.nomp = "",this.fecct = "",
    this.idcita = 0
  }

  ConsultarDniReset(){
    this.nombre = "", this.especialidad = "",
    this.nomp = "",this.fecct = "",
    this.idcita = 0
  }

}
