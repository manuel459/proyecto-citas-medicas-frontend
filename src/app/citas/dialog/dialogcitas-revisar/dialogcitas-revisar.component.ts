import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/service/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogcitas-revisar',
  templateUrl: './dialogcitas-revisar.component.html',
  styleUrls: ['./dialogcitas-revisar.component.css']
})
export class DialogcitasRevisarComponent implements OnInit {

    id: string;
    nombre:string;
    dnip: number;
    codmed: string;
    feccit: string;
    codes:string;
    estado: number;
    hora: string;
    resultado!: { hours: number; minutes: number; seconds: number; }; 
  constructor(public citasService:CitasService,@Inject(MAT_DIALOG_DATA) public citas :Citas) 
  {
    this.id = citas.id
    this.nombre = citas.nombre
    this.dnip = citas.dnip,
    this.codmed = citas.codmed,
    this.feccit = citas.feccit,
    this.codes = citas.codes,
    this.estado = citas.estado,
    this.hora = citas.hora
  }

  ngOnInit(): void {
    this.citasService.getNombreMedico(this.codmed).subscribe(response =>{
    this.nombre = response.data;});
    switch (this.codes) 
    {
      case 'E01': this.codes = 'Medicina General'
        break;
      case 'E02': this.codes = 'Obstetricia'
        break;
      case 'E03': this.codes = 'Otorrinolaringologia'
        break;
      case 'E04': this.codes = 'Pediatria'
        break;
      case 'E05': this.codes = 'Psicologia'
        break;
      case 'E06': this.codes = 'Radiologia'
        break;
      case 'E07': this.codes = 'Traumatologia'
        break;
    }
  }

  generarPdf()
  {
    
  }
}
