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

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  //Hub
  private _hubConnection : signalR.HubConnection | undefined;
  zeldaHub = "https://localhost:44301/PacienteHub";

  public lst:any[] | undefined; 
  public columnas: string[] =['Dnip','Idtip','Nomp','Numero','Edad','Email','actions'];
  readonly width: string ='500px';
  searchKey!: string;
  dataSource  = new MatTableDataSource<Response>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public load: Boolean =false
  status: string;
  texto: string;
  error: number;
  startDate: Date;
  endDate: Date;
  currentDate = new Date();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  constructor(
    private pacienteService: PacienteService,
    public dialog: MatDialog,
    public snackBar : MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService

  ) { this.status = "", this.texto = "",this.error = 1,this.startDate = this.currentDate,this.endDate = this.currentDate}

  ngOnInit(): void {
      this.ConnectionHub();
      this.getPacientes();
  }

  refresh(){
    this.texto = "";
    this.applyFilter(); 
  }

  applyFilter(){
    this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }

  //METODO PARA LISTAR
  getPacientes(){
    setTimeout(() => {
    this.pacienteService.getPacientes().subscribe(response =>{
     this.lst = response.data;
     if(response.exito === 1){
      this.error = response.exito;
      this.dataSource.data = response.data;  
      console.log(this.dataSource.data)
      this.refresh();
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

  fileExcel(){
    this.pacienteService.fileExcel(this.dataSource.data).subscribe(response =>{
      
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

  
  filters(){
    
    const paciente: FilterGeneric ={
      texto : this.texto,
      status: this.status,
      startdate: this.startDate,
      enddate : this.endDate
    }
    this.pacienteService.filters(paciente).subscribe(response => {
      if (response.exito === 0){
        this.error = response.exito; 
       }
        this.error = response.exito;
        this.dataSource.data = response.data; 
    });
  }


  ConnectionHub()
  {


    this._hubConnection  = new signalR.HubConnectionBuilder().withUrl("https://localhost:44301/PacienteHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
    }).build();

    
    this._hubConnection.on("Inserto paciente", (x)=> 
    {
      this.getPacientes();
      //this.messageService.add({severy: 'success', sumary: 'Insertado', detail: 'Order submited'})
    })  

    this._hubConnection
    .start()
    .then(() => console.log("Hub exitoso"))
    .catch(() => console.log("Hub Good "))

  }
  

}
