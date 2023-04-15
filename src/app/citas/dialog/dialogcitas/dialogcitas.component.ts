import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/service/citas.service';
import Swal from 'sweetalert2';
import {ConsultaDni} from 'src/app/Interfaces/ConsultaDni'
import { Horario } from 'src/app/models/horarios';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { ConfiguracionesService } from 'src/app/service/configuraciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialogcitas',
  templateUrl: './dialogcitas.component.html',
  styleUrls: ['./dialogcitas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogcitasComponent implements OnInit {
      date : any;
      costo: any;
      //Datos del paciente
      nombrePaciente: string|any;
      numeroPaciente: number|any;
      CorreoPaciente :string|any;
      EdadPaciente:number|any;
      //END
      array : any[];
      arrayHoras : any[];
      arrayStatus: any[];

      // nombre:string;
      todayDate:Date = new Date();
      public listaFechas: any[] ;
      public especialidades: [] | any;
      public medicos: [] | any;
      //Switch de envio de notificaciones
      bActiveNotificaciones = true;
      registerForm: FormGroup | any;
      fechasCargadas: boolean = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogcitasComponent>,
    public citasService: CitasService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public citas :Citas,public configuracionesService: ConfiguracionesService
  ) { 
    this.array = [];
    this.arrayHoras = [];
    this.arrayStatus = [];
    this.listaFechas = [];

    if(this.citas == null){
      this.registerForm = this.fb.group({
        dnip : ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
        codmed: ['', Validators.required],
        feccit:['', [Validators.required]],
        estado: [1],
        nombre: [''],
        hora: ['', Validators.required],
        codes: ['', Validators.required],
        // costo:['']
      }
      );}
      else
      {
        this.registerForm = this.fb.group({
          dnip : [this.citas.dnip,[Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[1-9]\d{6,10}$/)]],
          codmed: [this.citas.codmed, Validators.required],
          feccit:[this.citas.feccit, [Validators.required]],
          estado: [this.citas.estado],
          nombre: [this.citas.nombre],
          hora: [this.citas.hora, Validators.required],
          codes: [this.citas.codes, Validators.required],
          // costo: [this.citas.costo]
        }

        );
      }
  }


  ngOnInit(): void {
    this.getEspecialidad();
    this.getMedicos();
    this.getCosto();
    this.getDiasLaborables();
    this.getHorario();
    if(this.citas!=null){this.getDni()};
    this.dateFilter(this.registerForm.value.feccit);
  }

  close(){
    this.dialogRef.close();
  }

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
            const citas: Citas ={dnip: this.registerForm.value.dnip, nombre:this.registerForm.value.nombre, codmed:this.registerForm.value.codmed, feccit:this.registerForm.value.feccit,estado: this.registerForm.value.estado, hora:this.registerForm.value.hora,codes:this.registerForm.value.codes, CorreoElectronico:this.CorreoPaciente, nombrePaciente:this.nombrePaciente, id:'0', bActiveNotificaciones: this.bActiveNotificaciones}
            this.citasService.add(citas).subscribe(response =>{
                if (response.exito === 1){
                    this.dialogRef.close();
                    this.snackBar.open(response.mensaje,'',{
                        duration:2000
                    });
                }else
                {
                  this.snackBar.open(response.mensaje),'',
                  {
                    duration:2000
                  }
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
          const citas: Citas ={dnip: this.registerForm.value.dnip, nombre: this.registerForm.value.nombre,codmed:this.registerForm.value.codmed, feccit:this.registerForm.value.feccit,estado: this.registerForm.value.estado, hora:this.registerForm.value.hora,codes:this.registerForm.value.codes,CorreoElectronico:this.CorreoPaciente,nombrePaciente:this.nombrePaciente ,id:this.citas.id, bActiveNotificaciones: this.bActiveNotificaciones}
          this.citasService.edit(citas).subscribe(response =>{
              if (response.exito===1){
                  this.dialogRef.close();
                  this.snackBar.open('Cita editado con exito','',{
                      duration:2000
                  });
              }
              else 
              {
                  this.snackBar.open('Ocurrio un error al momento de editar la cita','',{
                      duration:2000
                  });
              }
          });
        }
    });
  
}

get registerFormControl() {
  return this.registerForm.controls;
}

getDni()
  {
    const ConsultaDni: ConsultaDni ={
      dnip: this.registerForm.value.dnip,
      codes: this.registerForm.value.codes
    }
    this.citasService.getDni(ConsultaDni).subscribe(response =>
      {
        if (response.data != null)
        {
           this.nombrePaciente = response.data.nomp,
           this.numeroPaciente=response.data.numero,
           this.EdadPaciente = response.data.edad,
           this.CorreoPaciente = response.data.correoElectronico
        }else 
        {
          Swal.fire(
            'Paciente no registrado',
            'Dni no coincide',
            'question'
          )
        }
      });
  }

  getEspecialidad(){this.configuracionesService.getConfiguraciones('Especialidad', '').subscribe(response =>{this.especialidades = response.data})}

  getMedicos(){this.configuracionesService.getConfiguraciones('Medico',this.registerForm.value.codes).subscribe(response => {this.medicos = response.data})}

  getDiasLaborables(){this.configuracionesService.getConfiguraciones('DiasLaborables',this.registerForm.value.codmed).subscribe(response => {this.listaFechas = Array.from(response.data.find((item: { sDescripcion: string; }) => (item.sDescripcion )).sDescripcion.split(',').map(Number)), this.fechasCargadas = true})}

  getCosto(){this.configuracionesService.getConfiguraciones('Costo', this.registerForm.value.codes).subscribe(response => {this.costo = response.data.find((item: { sDescripcion: string; }) => (item.sDescripcion )).sDescripcion})}
//FUNCION PARA CONVERTIR A FORMATO DE HORA
timeFunction(timeObj: { minutes: number | number; seconds: number | number; hours: number | number; }) {
  var min = timeObj.minutes < 10 ? "0" + timeObj.minutes : timeObj.minutes;
  var sec = timeObj.seconds < 10 ? "0" + timeObj.seconds : timeObj.seconds;
  var hour = timeObj.hours < 10 ? "0" + timeObj.hours : timeObj.hours;
  if(hour<12){
    return hour + ':' + min + ':' + sec + ' am' ;
  }else if(hour == 13)
  {
    return 'REFRIGERIO';
  }
  else{
    return hour + ':' + min + ':' + sec + ' pm';
  }
  
};

getHorario()
{ 
  const ConsultaHorario: Horario ={
    codmed : this.registerForm.value.codmed,
    feccit: this.registerForm.value.feccit
  } 
  this.citasService.getHorario(ConsultaHorario).subscribe(response => 
    {
      this.arrayHoras = [];
      response.data.forEach((element: any , index: any) => {
        this.arrayHoras[index] = element;
        this.arrayStatus[index] = element.status
    });
    })
    
}

dateFilter: (date: Date | any) => boolean =
(date: Date | any) => {
  const day = date?.getDay();
  console.log(this.listaFechas)
 return this.listaFechas.includes(day);
}

dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  const day = cellDate?.getDay();
  return this.listaFechas.includes(day)?'my-date':'my';
};

}
