import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ConsultarPagoCita } from '../Interfaces/ConsultarPagoCita';
import { insertPago } from '../Interfaces/InsertPago';
import { Anios, Meses } from '../Interfaces/Meses';
import { ModuloPagosService } from '../service/modulo-pagos.service';
import *  as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatHorizontalStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-modulo-pagos',
  templateUrl: './modulo-pagos.component.html',
  styleUrls: ['./modulo-pagos.component.css']
})
export class ModuloPagosComponent implements OnInit {
  @ViewChild('stepper') stepper: MatHorizontalStepper | any;
  registerForm: FormGroup | any;
  registerFormPagos: FormGroup | any;
//CONSULTA DE CITA
 idCita : string = "";
 nDnip: number = 0;
 sNombre_Paciente: string | undefined;
 sEspecialidad: string | undefined;
 sNombre_Medico: string | undefined;
 dFecha_Cita: string | undefined;
 dImporte_Total: number = 0;
 
 //PAGO DE CITA
 public nNumero_Tarjeta: string = "";
 public nMes: number = 0;
 public nAnio: number = 0;
 public nDia: number = 0;
 public nDni: number = 0;
 public cadena: string ;

 editable: boolean = false;

  Meses: Meses[] = [
    {value: '01', viewValue: '01'},
    {value: '02', viewValue: '02'},
    {value: '03', viewValue: '03'},
    {value: '04', viewValue: '04'},
    {value: '05', viewValue: '05'},
    {value: '06', viewValue: '06'},
    {value: '07', viewValue: '07'},
    {value: '08', viewValue: '08'},
    {value: '09', viewValue: '09'},
    {value: '10', viewValue: '10'},
    {value: '11', viewValue: '11'},
    {value: '12', viewValue: '12'},
  ];

  Anios: Anios[] = [
    {value: '2023', viewValue: '2023'},
    {value: '2024', viewValue: '2024'},
    {value: '2025', viewValue: '2025'},
    {value: '2026', viewValue: '2026'},
    {value: '2027', viewValue: '2027'},
    {value: '2028', viewValue: '2028'},
    {value: '2029', viewValue: '2029'},
    {value: '2030', viewValue: '2030'},
    {value: '2031', viewValue: '2031'},
    {value: '2032', viewValue: '2032'},
    {value: '2033', viewValue: '2033'},
    {value: '2034', viewValue: '2034'},
  ];


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.requiredTrue],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.requiredTrue],
  });

  threeFormGroup = this._formBuilder.group({
    secondCtrl: [''],
  });

  isEditable = false;

  pdfSrc: string | '' | any;

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, public pagosService: ModuloPagosService, public snackBar: MatSnackBar,private sanitizer: DomSanitizer) 
  {
    this.cadena = ''
    this.registerForm = this.fb.group({
      idCita: ['',[Validators.required, Validators.pattern(/^[1-9]\d{0,10}$/)]],
    });

    this.registerFormPagos = this.fb.group({
      nNumero_Tarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16),Validators.pattern(/^[1-9]\d{0,20}$/)]],
      nMes: ['',[Validators.required]],
      nAnio: ['',[Validators.required]],
      cvv: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      nDni: ['',[Validators.required, Validators.maxLength(8), Validators.minLength(8),Validators.pattern(/^[1-9]\d{0,10}$/)]]
    })
  }

  ngOnInit(): void {
  }

  get registerFormControlPagos() {
    return this.registerFormPagos.controls;
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  handleSuccessResponse() {
    this.stepper.next(); // Esta línea hace que el stepper avance al siguiente paso automáticamente
  }

  add()
  {
    const consultarPagoCita: ConsultarPagoCita = {idCita: this.registerForm.value.idCita}
    this.pagosService.getCita(consultarPagoCita).subscribe(response =>
      {
        if (response.exito === 1)
        {
          this.nDnip = response.data.nDnip,
          this.sNombre_Paciente = response.data.sNombre_Paciente,
          this.sEspecialidad = response.data.sEspecialidad,
          this.sNombre_Medico = response.data.sNombre_Medico,
          this.dFecha_Cita = response.data.dFecha_Cita,
          this.dImporte_Total = response.data.dImporte_Total,
          this.firstFormGroup = response.data.exito;
          Swal.fire(
            'Consulta exitosa',
            '',
            'success'
          )
        }else 
        {
          Swal.fire(
            'Código de cita invalido o caducado',
            '',
            'error'
          )
        }
      });
  }

  insertPago()
  {
    Swal.fire({
      title: "Confirmación",
      text: "¿Realmente deseas guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar",
  })
      .then((result) => {
          if (result.isConfirmed) {
            const pago: insertPago ={
              sCod_Cita: this.registerForm.value.idCita, nNumero_Tarjeta: this.registerFormPagos.value.nNumero_Tarjeta, nMes: this.registerFormPagos.value.nMes, nAnio: this.registerFormPagos.value.nAnio, nDni: this.registerFormPagos.value.nDni, dImporte_Total: this.dImporte_Total
            }
            console.log(pago)
            this.pagosService.insertPago(pago).subscribe(response =>{
                if (response.exito === 1){
                    this.snackBar.open('Pago realizado con exito','',{
                        duration:2000
                    });
                    this.stepper.next();
                    this.refreshVariable();
                    this.pdfSrc = 'data:application/pdf;base64,' + response.data.toString();
                    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc)
                    console.log(this.pdfSrc)
                }
                else
                {
                  this.snackBar.open(response.mensaje,'',{
                    duration:2000
                });
                }
            });
          }
      });
  }

  refreshVariable()
  {
    this.registerForm.reset();
    this.registerFormPagos.reset();
    this.nDnip = 0;
    this.sNombre_Paciente = '';
    this.sEspecialidad = '';
    this.sNombre_Medico = '';
    this.dFecha_Cita = '';
    this.dImporte_Total = 0;
  }

  send()
  {  
    this.cadena = `
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Boleta de Pago</title>
        <style>
            /* Estilos de la boleta de pago (puedes personalizarlos según tus necesidades) */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                border: 1px solid #ccc;
                padding: 20px;
                max-width: 500px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .employee-info {
                margin-bottom: 20px;
            }
            .table-container {
                width: 100%;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
            }
            .total {
                font-weight: bold;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Boleta de Pago</h1>
            </div>        
            <div class="employee-info">
                <p><strong>Código de Cita:</strong>`+this.registerForm.value.idCita+`</p>
                <p><strong>Datos personales:</strong>`+this.sNombre_Paciente+`</p>
                <p><strong>DNI:</strong>`+this.nDnip+`</p>
                <p><strong>Fecha de Transacción:</strong>`+ moment().format('YYYY-MM-DD')+`</p>
    
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Especialidad</th>
                            <th>Nombre del Médico</th>
                            <th>Nombre del Paciente</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>`+this.sNombre_Paciente+`</td>
                          <td>`+this.sEspecialidad+`</td>
                          <td>`+this.sNombre_Medico+`</td>
                          <td>`+this.sNombre_Paciente+`</td>
                          <td>$`+this.dImporte_Total.toString()+`</td>
                        </tr>
                        <!-- Agregar más filas según los conceptos de pago -->
                    </tbody>
                    <tfoot>
                        <tr>
                          <td class="total">Total</td>
                          <td class="total"></td>
                          <td class="total"></td>
                          <td class="total"></td>
                          <td class="total">$`+this.dImporte_Total.toString()+`</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </body>
    </html>`;
  }

  volverAlPrimerPaso() {
      this.stepper.reset();
      // Seleccionar el primer paso
      this.stepper.selectedIndex = 0;
  }

}

