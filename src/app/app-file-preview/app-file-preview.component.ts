import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-file-preview',
  templateUrl: './app-file-preview.component.html',
  styleUrls: ['./app-file-preview.component.css']
})
export class AppFilePreviewComponent implements OnInit {
  @Input() fileData: object| any; // El archivo base64 como una cadena
  constructor(private sanitizer: DomSanitizer,private http: HttpClient){}

  ngOnInit(): void {
  }

  formatDowdload(fileData: any): any {
    let base ;
    switch (fileData.sType_File) {
      case 'image/jpeg':
        base = `data:${fileData.sType_File};base64,${fileData.sUrl}`;
        //base = fileData.sUrl
        break;
      case 'application/pdf':
        base = `data:${fileData.sType_File};base64,${fileData.sUrl.toString()}`;
        base = this.sanitizer.bypassSecurityTrustResourceUrl(base)
        //base = fileData.sUrl
        break;
    }

    console.log(base)

    return base

  }

  // descargarArchivo() {
  //   console.log(this.fileData.sUrl)

  //   const headers = new HttpHeaders().set(
  //     "Accept",
  //     "image/webp,*/*,application/pdf"
  //   );

  //   this.http.get(this.fileData.sUrl, { headers, responseType: 'blob' as "json" })
  //   .subscribe(
  //     (data: Blob) => {
  //       const blob = new Blob([data], { type: 'application/pdf' });
  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = this.fileData.sFile_Name;
  //       link.click();
  //       window.URL.revokeObjectURL(link.href);
  //     },
  //     (error) => {
  //       console.error('Error en la solicitud:', error);
  //     }
  //   );
  // }


  descargarAdjunto(sUrl: any) {
    this.obtenerArchivo(sUrl).subscribe(
      (blob: any) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.fileData.sFile_Name;
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
      (error) => {}
    );
  }

  obtenerArchivo(sUrl: any): Observable<any> {
    console.log('llego aqui')
    let httpHeaders = new HttpHeaders().set(
      "Accept",
      "image/webp,*/*,application/pdf"
    );
    return this.http.get<Blob>(sUrl, {
      headers: httpHeaders,
      responseType: "blob" as "json",
    }); // revisar si cuando descarga pdf tambien lo toma como blob
  }

  getPdf() {

    const httpOptions = {
      responseType: 'blob' as 'json'
    };
  
    return this.http.get(this.fileData.sUrl, httpOptions);
  }

}
