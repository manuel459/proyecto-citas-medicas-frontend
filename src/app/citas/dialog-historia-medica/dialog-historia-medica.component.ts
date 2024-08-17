import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-historia-medica',
  templateUrl: './dialog-historia-medica.component.html',
  styleUrls: ['./dialog-historia-medica.component.css']
})
export class DialogHistoriaMedicaComponent implements OnInit {

  fileUrl = "https://www.mheducation.es/bcv/guide/capitulo/8448614194.pdf"
  previewData: string|any;

  constructor(@Inject(MAT_DIALOG_DATA) public lista:[{id: number,nomp:string,sNumero_Telefono: string, diagnostico: string,sNombre_Especialidad: string, sNombre_Medico:string, dnip:number, codes: string, codmed:string, receta:string, idCita:number, fecct:string, lUrlBase:string[]}]) { }

  public i: number = 0;

  ngOnInit(): void {
    console.log(this.lista[this.i].lUrlBase)
  }

  next()
  {
    this.i = this.i + 1;
    console.log(this.lista[this.i].lUrlBase)
  }
  preview()
  {
    this.i = this.i - 1;
  }

  createTempURL(oHistoriaMedica: object | any) {

    const medicamentos: any[] = [oHistoriaMedica.receta]
  
    const docDefinition = {
      content: [
        { text: 'RECETA MÉDICA', style: 'header' },
        { text: `Paciente: ${oHistoriaMedica.nomp}`, style: 'subheader' },
        { text: `Medico: ${oHistoriaMedica.sNombre_Medico}`, style: 'subheader' },
        { text: `Fecha: ${moment().format("YYYY-MM-DD")}`, style: 'subheader' },
        { text: 'Diagnóstico:', style: 'subheader' },
        { text: oHistoriaMedica.diagnostico },
        { text: 'Tratamiento:', style: 'subheader' }
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
        subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] }
      }
    };
  
    medicamentos.forEach((medicamento) => {
      docDefinition.content.push(
        { text: medicamento}
      );
    });

    const pdfMake: any = require('pdfmake/build/pdfmake');
    const pdfFonts: any = require('pdfmake/build/vfs_fonts');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blobReceta: Blob) => {
      const url = URL.createObjectURL(blobReceta);

      let message = `Estimado(a) ${oHistoriaMedica.nomp} , adjunto el link de su Diagnostico y receta ${url}`;
      let blob;
      let sTypeFile ='';
      // Convierte la cadena Base64 en un Blob
      oHistoriaMedica.lUrlBase.forEach((element: any) => {
        const byteCharacters = atob(element.sUrl);
        const byteNumbers = new Array(byteCharacters.length);
    
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        if(element.sType_File == 'application/pdf')
        {
          blob = new Blob([byteArray], { type: 'application/pdf' }); // Cambia el tipo si es una imagen
          sTypeFile = 'PDF'
        }else
        {
          blob = new Blob([byteArray], { type: 'image/jpg' }); // Cambia el tipo si es una imagen
          sTypeFile = 'JPG'
        }

        const url = URL.createObjectURL(blob);
        message = `${message} ${url}`
      });

      const whatsappLink = `https://wa.me/${oHistoriaMedica.sNumero_Telefono}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink);
    
    })



  }

   RECETA(oHistoriaMedica: object | any) {
    console.log(oHistoriaMedica, 'objeto')
    return new Promise((resolve, reject) => {
      const medicamentos: any[] = [oHistoriaMedica.receta]
  
      const docDefinition = {
        content: [
          { text: 'RECETA MÉDICA', style: 'header' },
          { text: `Paciente: ${oHistoriaMedica.nomp}`, style: 'subheader' },
          { text: `Medico: ${oHistoriaMedica.sNombre_Medico}`, style: 'subheader' },
          { text: `Fecha: ${moment().format("YYYY-MM-DD")}`, style: 'subheader' },
          { text: 'Diagnóstico:', style: 'subheader' },
          { text: oHistoriaMedica.diagnostico },
          { text: 'Tratamiento:', style: 'subheader' }
        ],
        styles: {
          header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },
          subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] }
        }
      };
    
      medicamentos.forEach((medicamento) => {
        docDefinition.content.push(
          { text: medicamento}
        );
      });
  
      const pdfMake: any = require('pdfmake/build/pdfmake');
      const pdfFonts: any = require('pdfmake/build/vfs_fonts');
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBlob((blob: Blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, (error: any) => {
        reject(error);
      });
    });
  } 
  
}
