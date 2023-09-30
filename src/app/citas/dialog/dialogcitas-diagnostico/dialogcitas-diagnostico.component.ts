import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List } from 'lodash';
import { DiagnosticoAdd } from 'src/app/Interfaces/DiagnosticoAdd';
import { Citas } from 'src/app/models/citas';
import { ConfiguracionesService } from 'src/app/service/configuraciones.service';
import { DiagnosticoService } from 'src/app/service/diagnostico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogcitas-diagnostico',
  templateUrl: './dialogcitas-diagnostico.component.html',
  styleUrls: ['./dialogcitas-diagnostico.component.css']
})
export class DialogcitasDiagnosticoComponent implements OnInit {
  registerForm: FormGroup | any;

  constructor(public configuracionesService:ConfiguracionesService,public dialogRef: MatDialogRef<DialogcitasDiagnosticoComponent>,private fb: FormBuilder,public diagnosticoService:DiagnosticoService,@Inject(MAT_DIALOG_DATA) public citas :Citas) 
  {
    this.registerForm = this.fb.group({
      diagnostico: ['', Validators.required],
      medicamentos: ['', Validators.required],
      file: [[]]
    }
    );
  }

  ngOnInit(): void {
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }

  saveHistory()
  {
    const diagnosticoAdd:DiagnosticoAdd = 
    {idCita: this.citas.id , DniPaciente:this.citas.dnip, Codes: this.citas.codes, Codmed:this.citas.codmed, fecct: this.citas.feccit, diagnostico:this.registerForm.value.diagnostico,
    medicamentos:this.registerForm.value.medicamentos}

    console.log(diagnosticoAdd)
    this.diagnosticoService.saveHistory(diagnosticoAdd, this.registerForm.get('file').value).subscribe(response =>
      {
        if(response.exito === 1)
        {
          this.dialogRef.close();
          Swal.fire(response.mensaje,
          '',
          'success');
        }else
        {
          Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: response.mensaje
            })
        }
      })
  }

  close(){
    this.dialogRef.close();
  }

  onFileSelect(event:any)
  {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.registerForm.get('file').setValue(file);
      console.log(this.registerForm.get('file').value)
    }
  }
}
