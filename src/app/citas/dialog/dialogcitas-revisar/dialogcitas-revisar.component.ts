import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Citas, CitasDetail } from 'src/app/models/citas';
import { CitasService } from 'src/app/service/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogcitas-revisar',
  templateUrl: './dialogcitas-revisar.component.html',
  styleUrls: ['./dialogcitas-revisar.component.css']
})
export class DialogcitasRevisarComponent implements OnInit {

  constructor(public citasService:CitasService,@Inject(MAT_DIALOG_DATA) public citas :CitasDetail) 
  {
  }

  ngOnInit(): void {
  }

}
