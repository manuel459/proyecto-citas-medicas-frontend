import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Citas, CitasDetail } from 'src/app/models/citas';
import { CitasService } from 'src/app/service/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogcitas-revisar',
  templateUrl: './dialogcitas-revisar.component.html',
  styleUrls: ['./dialogcitas-revisar.component.css']
})
export class DialogcitasRevisarComponent implements OnInit {

  pdfSrc: string | any;

  constructor(public citasService:CitasService,@Inject(MAT_DIALOG_DATA) public citas :CitasDetail,private sanitizer: DomSanitizer) 
  {
  }

  ngOnInit(): void {
    this.pdfSrc = 'data:application/pdf;base64,' + this.citas.urlBase.toString();
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc)
  }

}
