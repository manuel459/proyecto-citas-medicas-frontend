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

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, public pagosService: ModuloPagosService, public snackBar: MatSnackBar) 
  {
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
                    this.generarPDF()
                    this.refreshVariable()
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

  generarPDF() {
    const mergedVfs = Object.assign({}, pdfMake.vfs, pdfFonts.pdfMake.vfs);


    const documentDefinition = {
      content: [
        { text: 'Resultado de la transacción', style: 'header' },

        { text: '\nDatos Personales', style: 'subheader'},
        { text: 'Numero de Tarjeta:' + this.registerFormPagos.value.nNumero_Tarjeta},
        { text: 'DNI:' + this.registerFormPagos.value.nDni},

        { text: '\nDatos de la cita', style: 'subheader'},
        { text: 'Código de la cita: '+ this.registerForm.value.idCita },
        { text: 'Nombre del paciente: ' + this.sNombre_Paciente },
        { text: 'Monto: ' + this.dImporte_Total.toString() },

        { text: '\nResultado', style: 'subheader'},
        { text: 'Fecha de la Transacción: ' + moment().format('YYYY-MM-DD')},
        { text: 'Estado: ' + 'Pagado' },
        { text: 'Mensaje: ' + 'Transaccion exitosa' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        },
      }
    };
    console.log(documentDefinition)

    pdfMake.createPdf(documentDefinition, undefined , undefined, mergedVfs).getDataUrl((dataUrl) => {
      const iframe = document.createElement('iframe');
      iframe.src = dataUrl;
      iframe.width = '100%';
      iframe.height = '600px';
      document.getElementById('preview-container')?.appendChild(iframe);
    });

  }

  volverAlPrimerPaso() {
      this.stepper.reset();
      // Seleccionar el primer paso
      this.stepper.selectedIndex = 0;
  }

}

