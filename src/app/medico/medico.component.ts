import { Component, OnInit, ViewChild } from '@angular/core';
import {MedicosService} from 'src/app/service/medicos.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogmedicoComponent } from './dialog/dialogmedico/dialogmedico.component';
import { Medico } from '../models/medico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletemedicoComponent } from '../dialogdelete/deletemedico/deletemedico.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogmedicoRevisarComponent } from './dialog/dialogmedico-revisar/dialogmedico-revisar.component';
import { LoaderService } from '../loader.service';
import { FilterGeneric } from '../Interfaces/FilterGeneric';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public lst:any[] | undefined; 
  public columnas: string[] =['codmed','codes','idtip','nombre','sexo','nac','correo','dni','actions'];
  readonly width: string ='860px';
  searchKey!: string;
  dataSource  = new MatTableDataSource<Response>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public load: Boolean =false;
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
    private medicosService:MedicosService,
    public dialog: MatDialog,
    public snackBar : MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService
  ) { this.status = '',this.texto = '', this.error = 0,this.startDate = this.currentDate,this.endDate = this.currentDate}

  ngOnInit(): void {
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
    this.texto = "";
    this.applyFilter(); 
  }

  //METODO PARA LISTAR
  getMedicos(){
    setTimeout(() => {
      this.medicosService.getMedicos().subscribe(response =>{
        this.lst = response.data;
        if(response.exito ===1){
         this.dataSource.data = response.data;  
         this.refresh();
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

  //Metodo Delete
  delete(medico : Medico){
    const dialogRef= this.dialog.open(DeletemedicoComponent,{
      width: "300px",
    
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       
        this.medicosService.delete(medico.codmed).subscribe(response =>{
          if(response.exito === 1){
            
           
            this.snackBar.open('Medico eliminado con exito' , '' ,{
              duration: 2000,
             
            });
            this.getMedicos();
          }
        });
      }
    });
  }

  revisar(medico : Medico){
    const dialogRef= this.dialog.open(DialogmedicoRevisarComponent,{
      
      width: '540px',
      data: medico,
      
    });


    switch(medico.sexo)
    {
      case "M":
        medico.sexo = "Masculino"
        break;
      case "F":
        medico.sexo = "Femenino"
    }
    switch(medico.codes){
      case "E01":
         medico.codes = "Medicina General"
      break;
      case "E02":
         medico.codes = "Obstetricia"
      break;
      case "E03":
         medico.codes = "Otorrinolaringologia"
      break;
      case "E04":
         medico.codes = "Pediatria"
      break;
      case "E05":
         medico.codes = "Psicologia"
      break;
      case "E06":
         medico.codes = "Radiologia"
      break;
      case "E07":
         medico.codes = "Traumatologia"
      break;
    }
    
    console.log(medico.codes)
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
      this.getMedicos();
    })

  }

  filters(){
    
    const medico: FilterGeneric ={
      texto : this.texto,
      status: this.status,
      startdate: this.startDate,
      enddate : this.endDate
    }
    this.medicosService.filters(medico).subscribe(response => {
      if (response.exito === 0){
        this.error = response.exito; 
       }
        this.error = response.exito;
        this.dataSource.data = response.data; 
    });
  }


  
}
