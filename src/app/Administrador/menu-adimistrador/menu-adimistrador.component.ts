import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdministradorRegistrarNuevaCitaComponent } from '../administrador-registrar-nueva-cita/administrador-registrar-nueva-cita.component';
import { AdministradorRegistroPersonalComponent } from '../administrador-registro-personal/administrador-registro-personal.component';

@Component({
  selector: 'app-menu-adimistrador',
  templateUrl: './menu-adimistrador.component.html',
  styleUrls: ['./menu-adimistrador.component.css']
})
export class MenuAdimistradorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  RegistroMedico()
  {
    this.dialog.open(AdministradorRegistroPersonalComponent);
  }

  NuevaCita()
  {
    this.dialog.open(AdministradorRegistrarNuevaCitaComponent);
  }

}
