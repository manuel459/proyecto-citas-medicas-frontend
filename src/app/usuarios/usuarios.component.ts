import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from '../loader.service';
import { RequestGenericFilter } from '../Interfaces/RequestGenericFilter';
import { ConfiguracionesService } from '../service/configuraciones.service';
import { UsuariosService } from '../service/usuarios.service';
import { DialogUsuariosComponent } from './dialog/dialog-usuarios/dialog-usuarios.component';
import { Usuarios } from '../models/Usuarios';
import { DeleteusuarioComponent } from '../dialogdelete/deleteUsuario/deleteusuario.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public lst:any[] | undefined; 
  public columnas: string[] =['nIdUser','nIptip','sNomtip','sNombres','sApellidos','sSexo','dNac','sCorreo','nDni','actions'];
  readonly width: string ='700px';
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
  public BUTTON_EDIT_USUARIOS : boolean = false;
  public BUTTON_DELETE_USUARIOS: boolean = false;
  public BUTTON_CREATE_USUARIOS: boolean = false;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    public snackBar : MatSnackBar,
    public spinner:MatProgressSpinnerModule,
    public loaderService: LoaderService,
    public conf: ConfiguracionesService

  ) { this.status = 0, this.texto = "",this.error = 1,this.startDate = this.currentDate,this.endDate = this.currentDate}

  ngOnInit(): void {
      this.getPermiso()
      this.getUsuarios();
  }

  //METODO PARA LISTAR
  getUsuarios(){
    const requestGenericFilter: RequestGenericFilter = {
      numFilter: this.status, textFilter: this.texto, sFilterOne: '', sFilterTwo: '',
      dFechaInicio: '',
      dFechaFin: ''
    }
    setTimeout(() => {
    this.usuariosService.getUsuarios(requestGenericFilter).subscribe(response =>{
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
      this.usuariosService.getUsuarios(requestGenericFilter).subscribe(response =>{
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
    const dialogRef= this.dialog.open(DialogUsuariosComponent,{

      width: this.width
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result =>{
     
      this.getUsuarios();
    })
  }


  openEdit(usuarios : Usuarios){
    console.log(usuarios)
    const dialogRef= this.dialog.open(DialogUsuariosComponent,{
      width: this.width,
      data: usuarios,
      
    });
     //Refrescar el table cuando ejecute la accion del guardar
     dialogRef.afterClosed().subscribe(result =>{
     
      this.getUsuarios();

    })
  }
 
  //Metodo Delete
  deleteUser(nIdUser : number){
    const dialogRef= this.dialog.open(DeleteusuarioComponent,{
      width: "300px",
    });
//Refrescar el table cuando ejecute la accion del guardar
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       
        this.usuariosService.deleteUser(nIdUser).subscribe(response =>{
          if(response.exito === 1){
            
           
            this.snackBar.open('Usuario eliminado con exito' , '' ,{
              duration: 2000
            });
            this.getUsuarios();
          }
        });
      }
    });
  }

//   revisar(paciente : Paciente){
//     const dialogRef= this.dialog.open(DialogpacienteRevisarComponent,{     
//       width: '550px',
//       data: paciente,
//     });
//   }

  getPermiso()
  {
   var correo = JSON.parse(localStorage.getItem("usuario")!);
   this.conf.getConfiguraciones('Permisos', correo.correoElectronico).subscribe( response => 
     {
       this.BUTTON_CREATE_USUARIOS = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-CREATE-USUARIOS').length > 0;
       this.BUTTON_EDIT_USUARIOS = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-EDIT-USUARIOS').length > 0;
       this.BUTTON_DELETE_USUARIOS = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion == 'BUTTON-DELETE-USUARIOS').length > 0;
     })
  }

}
