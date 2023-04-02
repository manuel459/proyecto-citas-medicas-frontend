import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medico } from 'src/app/models/medico';

@Component({
  selector: 'app-dialogmedico-revisar',
  templateUrl: './dialogmedico-revisar.component.html',
  styleUrls: ['./dialogmedico-revisar.component.css']
})
export class DialogmedicoRevisarComponent implements OnInit {
  public nombre: string;
  public sexo:string;
  public nac: string;
  public correo: string;
  public pswd: string;
  public dni: number;
  public codes: string;
  public idhor: string;

  constructor( public dialogRef: MatDialogRef<DialogmedicoRevisarComponent>,

    public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public medico :Medico) { 
      this.nombre = medico.nombre
      this.sexo =medico.sexo,
    this.nac = medico.nac,
    this.correo = medico.correo,
    this.pswd =medico.pswd,
    this.dni =medico.dni,
    this.codes = medico.codes,
    this.idhor = medico.idhor
    }

  ngOnInit(): void {
    switch(this.idhor)
    {
      case "H001":
        this.idhor = "lun, mie, vie 08:00 - 20:00";
        break;
      case "H002":
        this.idhor = "mar,jue,sab 08:00 - 19:30";
        break;
      case "H003":
        this.idhor = "dom 09:45 - 13:15";
        break;
      case "H004":
        this.idhor = "lun-jue 09:30 - 17:00";
        break;
      case "H005":
        this.idhor = "vie y sab 08:00 - 19:30";
        break;
      case "H006":
        this.idhor = "lun-mie 09:30 - 20:00";
        break;
      case "H007":
        this.idhor = "jue-sab 09:15 - 18:45";
        break;
      case "H008":
        this.idhor = "lun-sab 08:00 - 13:00";
        break;
      case "H009":
        this.idhor = "lun-sab 14:30 - 20:10";
        break;
      case "H010":
        this.idhor = "mar,jue 08:30 - 18:30";
        break;
      // <option value="H001">lun, mie, vie 08:00 - 20:00</option>
      //   <option value="H002">mar,jue,sab 08:00 - 19:30</option>
      //   <option value="H003">dom 09:45 - 13:15</option>
      //   <option value="H004">lun-jue 09:30 - 17:00</option>
      //   <option value="H005">vie y sab 08:00 - 19:30</option>
      //   <option value="H006">lun-mie 09:30 - 20:00</option>
      //   <option value="H007">jue-sab 09:15 - 18:45</option>
      //   <option value="H008">lun-sab 08:00 - 13:00</option>
      //   <option value="H009">lun-sab 14:30 - 20:10</option>
      //   <option value="H010">mar,jue 08:30 - 18:30</option>
      //   <option value="H011">mie,vie,sab 08:30 - 19:00</option>
      //   <option value="H012">lun 08:00 - 20:00</option>
      //   <option value="H013">lun-jue 09:45 - 13:30</option>
      //   <option value="H014">lun-jue 14:45 - 18:45</option>
      //   <option value="H015">lun-vie 10:00 - 17:30</option>
      //   <option value="H016">sab 08:00 - 17:30</option>
    }
  }

  consulta()
  {
    
  }

  close(){
    this.dialogRef.close();
}
  
}
