import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DeletepacienteComponent } from '../dialogdelete/deletepaciente/deletepaciente.component';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import { LoaderService } from '../loader.service';
import { Paciente } from '../models/paciente';
import { PacienteService } from '../service/paciente.service';
import { DialogpacienteRevisarComponent } from './dialog/dialogpaciente-revisar/dialogpaciente-revisar.component';
import { DialogpacienteComponent } from './dialog/dialogpaciente/dialogpaciente.component';
import * as signalR from '@aspnet/signalr';
import * as XLSX from 'xlsx';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { ConfiguracionesService } from '../service/configuraciones.service';
import { CitasService } from '../service/citas.service';
import { DialogHistoriaMedicaComponent } from '../citas/dialog-historia-medica/dialog-historia-medica.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  public lst:any[] | undefined; 
  public columnas: string[] =['Dnip','Idtip','Nomp','Apellidos','Numero','Edad','Email','actions'];
  readonly width: string ='600px';
  searchKey!: string;
  dataSource  = new MatTableDataSource<Response>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public load: Boolean =false
  status: number;
  texto: string;
  error: number;
  startDate: Date;
  endDate: Date;
  currentDate = new Date();
  public BUTTON_EDIT_PACIENTE : boolean = false;
  public BUTTON_DELETE_PACIENTE: boolean = false;
  public BUTTON_CREATE_PACIENTE: boolean = false;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  constructor(
    private pacienteService: PacienteService,
    public dialog: MatDialog,
    public snackBar : MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService,
    public conf: ConfiguracionesService,
    public citasService : CitasService

  ) { this.status = 0, this.texto = "",this.error = 1,this.startDate = this.currentDate,this.endDate = this.currentDate}

  ngOnInit(): void {
    this.getPermiso()
      this.getPacientes();
  }

  //METODO PARA LISTAR
  getPacientes(){
    const requestGenericFilter: RequestGenericFilter = {
      numFilter: this.status, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
      dFechaInicio: '',
      dFechaFin: ''
    }
    setTimeout(() => {
    this.pacienteService.getPacientes(requestGenericFilter).subscribe(response =>{
     this.lst = response.data;
     if(response.exito === 1){
      this.error = response.exito;
      this.dataSource.data = response.data;
     } 
    });
   },1000);
   }

   refresh()
   {
      const requestGenericFilter: RequestGenericFilter = {
        numFilter: 0, textFilter: '', sFilterOne: '', sFilterTwo: '',
        dFechaInicio: '',
        dFechaFin: ''
      }
      setTimeout(() => {
      this.pacienteService.getPacientes(requestGenericFilter).subscribe(response =>{
      this.lst = response.data;
      if(response.exito === 1){
        this.error = response.exito;
        this.dataSource.data = response.data;
        this.texto = ""
      } 
      });
    },1000);
   }


   openAdd(){
    const dialogRef= this.dialog.open(DialogpacienteComponent,{

      width: this.width
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
     
      this.getPacientes();
    })
  }


  openEdit(paciente : Paciente){
    console.log(paciente)
    const dialogRef= this.dialog.open(DialogpacienteComponent,{

      width: this.width,
      data: paciente,
      
    });
     //Refrescar el table cuando ejecute la accion del guardar
     dialogRef.afterClosed().subscribe(result =>{
     
      this.getPacientes();

    })
  }
 

  //Metodo Delete
  delete(paciente : Paciente){
    const dialogRef= this.dialog.open(DeletepacienteComponent,{
      width: "300px",
    
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       
        this.pacienteService.delete(paciente.dnip).subscribe(response =>{
          if(response.exito === 1){
            
           
            this.snackBar.open('Paciente eliminado con exito' , '' ,{
              duration: 2000
            });
            this.getPacientes();
          }
        });
      }
    });
  }

  revisar(paciente : Paciente){
    const dialogRef= this.dialog.open(DialogpacienteRevisarComponent,{     
      width: '550px',
      data: paciente,
    });
  }

  historiaMedica(row: number)
  {
    this.citasService.getHistoriaMedica(row).subscribe(response => 
      {
        const dialogRef= this.dialog.open(DialogHistoriaMedicaComponent,{
          width: '1200px',
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
  getPermiso()
  {
   var correo = JSON.parse(localStorage.getItem("usuario")!);
   this.conf.getConfiguraciones('Permisos', correo.correoElectronico).subscribe( response => 
     {
       this.BUTTON_CREATE_PACIENTE = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-CREATE-PACIENTE').length > 0;
       this.BUTTON_EDIT_PACIENTE = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-EDIT-PACIENTE').length > 0;
       this.BUTTON_DELETE_PACIENTE = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-DELETE-PACIENTE').length > 0;
     })
  }

  

}
