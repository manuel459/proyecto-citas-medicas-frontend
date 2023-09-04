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
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { LoaderService } from '../loader.service';
import { Citas, CitasDetail } from '../models/citas';
import { CitasService } from '../service/citas.service';
import { DialogcitasRevisarComponent } from './dialog/dialogcitas-revisar/dialogcitas-revisar.component';
import { DialogcitasComponent } from './dialog/dialogcitas/dialogcitas.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DialogcitasDiagnosticoComponent } from './dialog/dialogcitas-diagnostico/dialogcitas-diagnostico.component';
import { ConfiguracionesService } from '../service/configuraciones.service';
import { saveAs } from 'file-saver';
import { DialogHistoriaMedicaComponent } from './dialog-historia-medica/dialog-historia-medica.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { IconService } from '@visurel/iconify-angular';
import { IconsService } from '../service/icons.service';

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
  readonly width: string ='1050px';
  searchKey!: string;
  dataSource  = new table.MatTableDataSource<Response>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public load: Boolean =false
  resultado!: { hours: number; minutes: number; seconds: number; }; 
  status: number = 0;
  texto: string;
  error: number;
  startDate: Date | any;
  endDate: Date | any;
  currentDate = new Date();
  range = new FormGroup({ start: new FormControl(new Date()),end: new FormControl(new Date())});
  //PERMISOS
  public BUTTON_CREATE_CITA: boolean = false;
  public GENERAR_DIAGNOSTICO :  boolean = false;
  public VIEW_DETAIL_CITA :  boolean = false;
  public VIEW_EDIT_CITA :  boolean = false;
  public VIEW_DELETE_CITA :  boolean = false;

  mostrar: boolean = false;
  mostrarDia: boolean = false;
  mostrarCha: boolean = false;

  public listaDes : number[] | any = [];
  public lista : number[] | any = [];
  public listaChat : number[] | any = [];

  constructor(
    public configuracionesService: ConfiguracionesService,
    public citasService: CitasService,
    public dialog: MatDialog,
    public snackBar : snackBar.MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService,
    private router: Router,
  ) {this.status = 0, this.texto = "",this.error = 1}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPermisos();
    this.getCitas();

  }

  //VALIDACION DE DESCRIPCION


  mostrarDescripcion(row: number) {
    this.listaDes.push(row);
  }

  ocultarDescripcion(row: number) {
    const index = this.listaDes.findIndex((elemento: any) => elemento === row);
    if (index !== -1) {
      this.listaDes.splice(index, 1);
    }
    this.listaDes = []
  }

  //VALIDACION DE DIAGNOSTICO

  
  ocultarDiagnostico(row: number) {
    const index = this.lista.findIndex((elemento: any) => elemento === row);
    if (index !== -1) {
      this.lista.splice(index, 1);
    }
  }

  mostrarDiagnostico(row: number) {
    this.lista.push(row);
  }
  //END

  //VALIDACION DE CHAT
  ocultarChat(row: number) {
    const index = this.listaChat.findIndex((elemento: any) => elemento === row);
    if (index !== -1) {
      this.listaChat.splice(index, 1);
    }
  }

  mostrarChat(row: number) {
    this.listaChat.push(row);
  }
  //END

  getPermisos()
  {
    var correo = JSON.parse(localStorage.getItem("usuario")!);
    this.configuracionesService.getConfiguraciones('Permisos', correo.correoElectronico).subscribe(response => 
      {
        this.BUTTON_CREATE_CITA = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-CREATE-CITA').length > 0;
        console.log(this.BUTTON_CREATE_CITA);
        this.GENERAR_DIAGNOSTICO = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'GENERAR-DIAGNOSTICO').length > 0;
        this.VIEW_DETAIL_CITA = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'VIEW-DETAIL-CITA').length > 0;
        this.VIEW_EDIT_CITA = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'VIEW-EDIT-CITA').length > 0;
        this.VIEW_DELETE_CITA = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'VIEW-DELETE-CITA').length > 0;
      })
  }


  refresh()
  {
    this.texto = ''
    this.range = new FormGroup({
      start: new FormControl(new Date()), // Inicializa con la fecha actual
      end: new FormControl(new Date()) // Inicializa con la fecha actual
    }); 
    const requestGenericFilter: RequestGenericFilter = {
      numFilter: 0, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
      dFechaInicio: moment().format("YYYY-MM-DD"),
      dFechaFin: moment().format("YYYY-MM-DD")
    }
    this.getListGeneric(requestGenericFilter)

  }

  refreshFiltroType()
  {
    this.texto = ''  
    const requestGenericFilter: RequestGenericFilter = {
      numFilter: 0, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
      dFechaInicio: moment(this.range.get('start')?.value).format("YYYY-MM-DD"),
      dFechaFin: moment(this.range.get('end')?.value).format("YYYY-MM-DD")
    }
    this.getListGeneric(requestGenericFilter)
  }
  
  
  //METODO PARA LISTAR
  getCitas(){
      const requestGenericFilter: RequestGenericFilter = {
        numFilter: this.status, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
        dFechaInicio: moment(this.range.get('start')?.value).format("YYYY-MM-DD"),
        dFechaFin: moment(this.range.get('end')?.value).format("YYYY-MM-DD")
      }
      this.getListGeneric(requestGenericFilter)

   }


   //Llamado al metodo general

   getListGeneric(requestGenericFilter : RequestGenericFilter)
   {
    this.citasService.getCitas(requestGenericFilter).subscribe(response =>{
      if(response.exito === 1){
       this.dataSource.data = response.data;
      }
     });
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

  //Insertar Diagnostico Medico
  diagnosticoAdd(citas: Citas)
  {
    console.log(citas)
    const dialogRef= this.dialog.open(DialogcitasDiagnosticoComponent,{
      width: '500px',
      data: citas,  
    });
     //Refrescar el table cuando ejecute la accion del guardar
     dialogRef.afterClosed().subscribe(result => 
      {
        console.log(dialogRef)
          this.getCitas();
      })
  }

  revisar(citas : CitasDetail)
  {
    const dialogRef= this.dialog.open(DialogcitasRevisarComponent,{
      width: '900px',
      data: citas,  
    });
  }

  historiaMedica(row: number)
  {
    this.citasService.getHistoriaMedica(row).subscribe(response => 
      {
        const dialogRef= this.dialog.open(DialogHistoriaMedicaComponent,{
          width: '1000px',
          data : response.data  
        });
        console.log(response.data)
      });

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



  sendWhatsappMessage(sNombre_Paciente:string, sNombre_Medico :string,nNumero_Paciente:string, diagnostico:string, receta:string) {
    // const whatsappLink = `https://wa.me/${nNumero_Paciente}?text=${encodeURIComponent('Diagnostico:'+diagnostico+' Receta:'+receta)}`;
  
    const medicamentos: any[] = [ receta]
  
    const docDefinition = {
      content: [
        { text: 'RECETA MÉDICA', style: 'header' },
        { text: `Paciente: ${sNombre_Paciente}`, style: 'subheader' },
        { text: `Medico: ${sNombre_Medico}`, style: 'subheader' },
        { text: `Fecha: ${moment().format("YYYY-MM-DD")}`, style: 'subheader' },
        { text: 'Diagnóstico:', style: 'subheader' },
        { text: diagnostico },
        { text: 'Tratamiento:', style: 'subheader' }
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
        subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] }
      }
    };
  
    medicamentos.forEach((medicamento) => {
      docDefinition.content.push(
        { text: medicamento}
      );
    });
  
    const pdfMake: any = require('pdfmake/build/pdfmake');
    const pdfFonts: any = require('pdfmake/build/vfs_fonts');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const message = `Estimado(a) ${sNombre_Paciente} , adjunto el link de su receta en pdf: ${url}`;
      const whatsappLink = `https://wa.me/${nNumero_Paciente}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink);
    });



  }

}



