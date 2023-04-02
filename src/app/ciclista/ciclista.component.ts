
import Swal from 'sweetalert2';
import { ApiciclistaService } from '../service/apiciclista.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-ciclista',
  templateUrl: './ciclista.component.html',
  styleUrls: ['./ciclista.component.css']
})
export class CiclistaComponent implements OnInit {

  public lst: any[] = [];
  public columnas: string[]=['id','cliente','ruc','direccion','vendedor','metodoPago','descripcion','opGravadas','igv','montoTotal','estado'];
  constructor(
    private apiCiclista : ApiciclistaService
  ) { 

  }

  ngOnInit(): void {
    this.getFacturas();
  }

  getCiclista(){
    this.apiCiclista.getBicicleta().subscribe(response => 
      {
        this.lst = response.data;
        if(response.mensaje =='Facturas declaradas')
        {
          Swal.fire(
            'Auditoria Realizada!',
            '',
            'success'
          )
          
        }else
        {
          Swal.fire({
            title: 'No hay facturas pendientes',
            icon: 'warning'
          }
          )
        }
        this.getFacturas();
      });
  }

  getFacturas()
  {
    this.apiCiclista.getFacturas().subscribe(response => 
      {
        this.lst = response.data;
        console.log(response);
      });
  }
}
