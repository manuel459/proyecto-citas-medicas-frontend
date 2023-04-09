import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as snackBar from '@angular/material/snack-bar';
import * as table from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { DeletecitasComponent } from '../dialogdelete/deletecitas/deletecitas.component';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { LoaderService } from '../loader.service';
import { Citas } from '../models/citas';
import { CitasService } from '../service/citas.service';
import { DialogcitasRevisarComponent } from './dialog/dialogcitas-revisar/dialogcitas-revisar.component';
import { DialogcitasComponent } from './dialog/dialogcitas/dialogcitas.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
  value:number
}

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})


export class CitasComponent implements OnInit {

  public lst:any[] | undefined; 
  public columnas: string[] =['Id','Dni_Paciente','Nombre_Paciente','Nombre_Medico','Nombre_Especialidad','Fecha_Cita','Estado_Cita','hora','Estado_Pago','Costo','actions'];
  readonly width: string ='1100px';
  searchKey!: string;
  dataSource  = new table.MatTableDataSource<Response>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public load: Boolean =false
  resultado!: { hours: number; minutes: number; seconds: number; }; 
  status: number;
  texto: string;
  error: number;
  startDate: Date | any;
  endDate: Date | any;
  currentDate = new Date();
  range = new FormGroup({ start: new FormControl(new Date()),end: new FormControl(new Date())});
  constructor(
    public citasService: CitasService,
    public dialog: MatDialog,
    public snackBar : snackBar.MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService,
    private router: Router
  ) {this.status = 0, this.texto = "",this.error = 1}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getCitas();
  }

  refresh(){
    this.texto = "";
    this.applyFilter(); 
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter= this.searchKey.trim().toLowerCase();
    console.log(this.dataSource)
  }

  
  
  //METODO PARA LISTAR
  getCitas(){
    setTimeout(() => {
      console.log( moment(this.range.get('start')?.value).format("YYYY-MM-DD"))
      const requestGenericFilter: RequestGenericFilter = {
        numFilter: this.status, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
        dFechaInicio: moment(this.range.get('start')?.value).format("YYYY-MM-DD"),
        dFechaFin: moment(this.range.get('end')?.value).format("YYYY-MM-DD")
      }
      this.citasService.getCitas(requestGenericFilter).subscribe(response =>{
        this.lst = response.data;
        if(response.exito === 1){
         response.data.forEach((element: { hora: any; nEstado_Pago: any}) => {
           var horaJson = JSON.stringify(element.hora);
            //convertir el json a objeto
           this.resultado = JSON.parse(horaJson);
           var min = this.resultado.minutes < 10 ? "0" + this.resultado.minutes : this.resultado.minutes;
           var sec = this.resultado.seconds < 10 ? "0" + this.resultado.seconds : this.resultado.seconds;
           var hour = this.resultado.hours < 10 ? "0" + this.resultado.hours : this.resultado.hours;
           element.hora = hour + ':' + min + ':' + sec + ' pm';
   
           if(hour<12)
           {
             element.hora = hour + ':' + min + ':' + sec + ' am' ;
             return element.hora
           }
           else
           {
             element.hora = hour + ':' + min + ':' + sec + ' pm';
             return element.hora
           }

  
         });

         this.dataSource.data = response.data;
         this.refresh();
        }
       });
    }, 1000);
    
   }

   openAdd(){
    const dialogRef= this.dialog.open(DialogcitasComponent,{
      
      width: this.width
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
      this.getCitas();
    })
  }

  openEdit(citas : Citas){
    const dialogRef = this.dialog.open(DialogcitasComponent,{
      width: this.width,
      data: citas,
    });
    console.log(citas)
    //Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result => 
    {
      console.log(dialogRef)
        this.getCitas();
    })
}

  //Metodo Delete
  delete(citas : Citas){
    const dialogRef= this.dialog.open(DeletecitasComponent,{
      width: "300px",
    
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(dialogRef)
        this.citasService.delete(citas.id).subscribe(response =>{
          if(response.exito === 1){
            this.snackBar.open('Cita eliminado con exito' , '' ,{
              duration: 2000,      
            });
            this.getCitas();
          }
        });
      }
    });
  }

  revisar(citas : Citas)
  {
    const dialogRef= this.dialog.open(DialogcitasRevisarComponent,{
      width: '540px',
      data: citas,  
    });
  }

  fileExcel(){
    this.citasService.fileExcel(this.dataSource.data).subscribe(response =>{
      this.lst = response.data;
      if(response.exito === 1){
        Swal.fire(
          'Excel exportado con exito!',
          '',
          'success'
        )
      }
     });
  }


  generarPdf()
  {
    this.citasService.getPdf(this.dataSource.data).subscribe(response => 
    {
      if (response.exito == 1){
        Swal.fire(
          'Reporte generado con exito!',
          '',
          'success'
        )
      }
    })
  }

  exportExcel(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }
  
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
  }

  exportToPdf(): void {
    const doc =  Object.assign(new jsPDF());
    const datas =  this.dataSource.data.map((row: any) => {
      return [row.id, row.dnip, row.sNombre_Paciente, row.sNombre_Medico, row.sNombre_Especialidad, (moment(row.feccit).format('YYYY-MM-DD')+' '+row.hora), row.sEstado, row.sEstado_Pago, row.costo];
    });

    try {
      const headerss = ['ID', 'DNI', 'Nombre_del_Paciente', 'Nombre_Medico', 'Nombre_Especialidad', 'Fecha_Cita','Estado_de_Cita', 'Estado_de_Pago', 'Costo_de_cita'];
      doc.text('Reporte de Citas', 20, 20);
      doc.autoTable({
        startY:40,
        styles: {
          fontSize: 6,
          cellPadding: 2,
          fillColor: [200, 200, 200],
          textColor: [0, 0, 0],
          border: {
            top: 1,
            left: 1,
            right: 1,
            bottom: 1
          }
        },
        head: [headerss],
        body: datas
      });
      doc.save('reporte_citas.pdf');
      
    } catch (error) {
      console.log(error)
    }
    
  }

}


