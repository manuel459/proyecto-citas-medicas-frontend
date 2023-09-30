import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-app-file-preview',
  templateUrl: './app-file-preview.component.html',
  styleUrls: ['./app-file-preview.component.css']
})
export class AppFilePreviewComponent implements OnInit {
  @Input() fileData: object| any; // El archivo base64 como una cadena
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  formatDowdload(fileData: any): any {
    let base ;
    switch (fileData.sType_File) {
      case 'image/jpeg':
        base = `data:${fileData.sType_File};base64,${fileData.sUrl}`;
        break;
      case 'application/pdf':
        base = `data:${fileData.sType_File};base64,${fileData.sUrl.toString()}`;
        base = this.sanitizer.bypassSecurityTrustResourceUrl(base)
        break;
    }

    return base

  }

}
