import { Component, OnInit, ViewChild } from '@angular/core';
import {MedicosService} from 'src/app/service/medicos.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogmedicoComponent } from './dialog/dialogmedico/dialogmedico.component';
import { Medico } from '../models/medico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogmedicoRevisarComponent } from './dialog/dialogmedico-revisar/dialogmedico-revisar.component';
import { LoaderService } from '../loader.service';
import { FilterGeneric } from '../Interfaces/FilterGeneric';
import * as XLSX from 'xlsx';
import { ConfiguracionesService } from '../service/configuraciones.service';
import Swal from 'sweetalert2';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { ReporteMedico } from '../Interfaces/RegistroMedico';
import * as _ from 'lodash';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public lst:any[] | undefined; 
  public columnas: string[] =['codmed','codes','idtip','nombre','sApellidos','sexo','nac','correo','dni','actions'];
  readonly width: string ='800px';
  searchKey!: string;
  dataSource  = new MatTableDataSource<Response>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public load: Boolean =false;
  status: number;
  texto: string;
  error: number;
  startDate: Date;
  endDate: Date;
  currentDate = new Date();
  //Permisos
  public BUTTON_CREATE_MEDICO: boolean = false;
  public BUTTON_EDIT_MEDICO : boolean = false;
  public BUTTON_DELETE_MEDICO : boolean = false;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  constructor(
    private medicosService:MedicosService,
    public dialog: MatDialog,
    public snackBar : MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService,
    public conf: ConfiguracionesService
  ) { this.status = 0,this.texto = '', this.error = 0,this.startDate = this.currentDate,this.endDate = this.currentDate}

  ngOnInit(): void {
    this.getPermiso();
    this.getMedicos();
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }

  refresh(){
      const requestGenericFilter: RequestGenericFilter = {
        numFilter: 0, textFilter: '', sFilterOne: '', sFilterTwo: '',
        dFechaInicio: '',
        dFechaFin: ''
      }
      setTimeout(() => 
      {
        this.medicosService.getMedicos(requestGenericFilter).subscribe(response =>
        {
          this.lst = response.data;
          if(response.exito === 1)
          {
            this.error = response.exito;
            this.dataSource.data = response.data;
            this.texto = ""
          } 
        });
      },1000);
  }

  //METODO PARA LISTAR
  getMedicos(){
    const requestGenericFilter: RequestGenericFilter = {
      numFilter: this.status, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
      dFechaInicio: '',
      dFechaFin: ''
    }

    setTimeout(() => {
      this.medicosService.getMedicos(requestGenericFilter).subscribe(response =>{
        this.lst = response.data;
        if(response.exito ===1){
         this.dataSource.data = response.data;  
        }
       });
    }, 1000);
    
   }


   openAdd(){
    const dialogRef= this.dialog.open(DialogmedicoComponent,{

      width: this.width
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
     
      this.getMedicos();
    })
  }


  openEdit(medico : Medico){
    const dialogRef= this.dialog.open(DialogmedicoComponent,{

      width: this.width,
      data: medico,
      
    });
    console.log(medico)
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
      this.getMedicos();
    })

  }

  BusinessHours(Codmed: string)
  {

    Swal.fire({
      title: "Confirmación",
      text: "¿Estas seguro de envíar el Horario?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar",
    })
      .then((result) => {
          if (result.isConfirmed) {
            this.medicosService.BusinessHours(Codmed).subscribe(
              response => 
              {
                this.snackBar.open(response.mensaje,'',{
                  duration:2000
              });
              });
          }
      });

  }

  //Metodo Delete
  delete(codmed : string, nEstado: number){
    Swal.fire({
      title: "Confirmación",
      text: "¿Estas seguro de "+ ((nEstado == 1)?"Activar":"Desactivar")+ " el usuario?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar",
    })
      .then
      ( (result) => 
        {
          if (result.isConfirmed) 
          {
            this.medicosService.delete(codmed, nEstado).subscribe(response =>
            {
              if(response.exito === 1)
              {
                this.snackBar.open(response.mensaje , '' ,
                {
                  duration: 2000,
                });
                this.getMedicos();
              }else
              {
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.mensaje
              })
              }
            });
          }
        }
      );
  }

  revisar(medico : Medico){
    const dialogRef= this.dialog.open(DialogmedicoRevisarComponent,{
      
      width: '590px',
      data: medico,
      
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
      this.getMedicos();
    })

  }


  exportExcel(data: any[], fileName: string): void {
    const columnasDeseadas: string[] = ["codmed",	"codes"	,"idtip"	,"nombre"	,"sApellidos",	"sexo",	"nac","correo",	"dni"	,"idhor" ]
    const nuevaLista = data.map((item) => _.pick(item, columnasDeseadas))

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(nuevaLista);
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
      this.BUTTON_CREATE_MEDICO = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-CREATE-MEDICO').length > 0;
      this.BUTTON_EDIT_MEDICO = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-EDIT-MEDICO').length > 0;
      this.BUTTON_DELETE_MEDICO = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-DELETE-MEDICO').length > 0;
     })
  }

  
}
