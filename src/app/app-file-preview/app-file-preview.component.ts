import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  descargarArchivo() {
    console.log(this.fileData.sUrl)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200', 
      'Authorization': 'undefined',
    });

    this.http.get(this.fileData.sUrl, { headers, responseType: 'blob' })
    .subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.fileData.sFile_Name;
        link.click();
        window.URL.revokeObjectURL(link.href);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

}
