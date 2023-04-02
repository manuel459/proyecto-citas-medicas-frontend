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

@Component({
  selector: 'app-dialogcitas',
  templateUrl: './dialogcitas.component.html',
  styleUrls: ['./dialogcitas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogcitasComponent implements OnInit {
      date : any;
      codes: string;
      dnip: number;
      codmed: string;
      feccit: string;
      estado: number;
      hora: string;
      //Datos del paciente
      nombrePaciente: string|any;
      numeroPaciente: number|any;
      CorreoPaciente :string|any;
      EdadPaciente:number|any;
      //END
      array : any[];
      arrayHoras : any[];
      arrayStatus: any[];
      costo: any;
      nombre:string;
      todayDate:Date = new Date();
      public listaFechas: any[] ;
      public especialidades: [] | any;
      public medicos: [] | any;
      //Switch de envio de notificaciones
      bActiveNotificaciones = true;
  constructor(
    public dialogRef: MatDialogRef<DialogcitasComponent>,
    public citasService: CitasService,
    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public citas :Citas,public configuracionesService: ConfiguracionesService
  ) { 
    this.array = [];
    this.arrayHoras = [];
    this.arrayStatus = [];
    this.listaFechas = [];
    if(this.citas !== null){
      this.dnip = citas.dnip,
      this.codmed = citas.codmed,
      this.feccit = citas.feccit,
      this.estado = citas.estado,
      this.nombre = citas.nombre,
      this.hora = citas.hora,
      this.codes = citas.codes}
    else{
    this.dnip = 0,
    this.codmed = "",
    this.feccit = ""
    this.estado = 0,
    this.hora = "",
    this.codes = "";
    this.nombre ="";
    this.nombrePaciente="";
    }  
  }


  ngOnInit(): void {
    this.getEspecialidad();
    this.getMedicos();
    this.getDiasLaborables();
    this.getHorario();
    if(this.citas!=null){this.getDni()};

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
            const citas: Citas ={dnip: this.dnip, nombre:this.nombre, codmed:this.codmed, feccit:this.feccit,estado: this.estado, hora:this.hora,codes:this.codes,CorreoElectronico:this.CorreoPaciente, nombrePaciente:this.nombrePaciente,id:'0', bActiveNotificaciones: this.bActiveNotificaciones}
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
          const citas: Citas ={dnip: this.dnip, nombre: this.nombre,codmed:this.codmed, feccit:this.feccit,estado: this.estado, hora:this.hora,codes:this.codes,CorreoElectronico:this.CorreoPaciente,nombrePaciente:this.nombrePaciente,id:this.citas.id, bActiveNotificaciones: this.bActiveNotificaciones}
          this.citasService.edit(citas).subscribe(response =>{
              if (response.exito===1){
                  this.dialogRef.close();
                  this.snackBar.open('Cita editado con exito','',{
                      duration:2000
                  });
              }
          });
        }
    });
  
}

getDni()
  {
    const ConsultaDni: ConsultaDni ={
      dnip: this.dnip,
      codes: this.codes
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

  getMedicos(){this.configuracionesService.getConfiguraciones('Medico',this.codes).subscribe(response => {this.medicos = response.data})}

  getDiasLaborables(){this.configuracionesService.getConfiguraciones('DiasLaborables',this.codmed).subscribe(response => {this.listaFechas = Array.from(response.data.find((item: { sDescripcion: string; }) => (item.sDescripcion )).sDescripcion.split(',').map(Number))})}

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
    codmed : this.codmed,
    feccit: this.feccit
  } 
  this.citasService.getHorario(ConsultaHorario).subscribe(response => 
    {
      this.arrayHoras = [];
      response.data.forEach((element: any , index: any) => {
        this.arrayHoras[index] = element;
        console.log(element)
        this.arrayStatus[index] = element.status
    });
    })
    
}

dateFilter: (date: Date | null) => boolean =
(date: Date | null) => {
  const day = date?.getDay();
  return this.listaFechas.includes(day);
  //0 means sunday
  //6 means saturday
}

dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  const day = cellDate?.getDay();
  console.log(day)
  return this.listaFechas.includes(day)?'my-date':'my';
};

}
