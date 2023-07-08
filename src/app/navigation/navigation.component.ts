import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ConfiguracionesService } from '../service/configuraciones.service';
import * as moment from 'moment';
declare var google: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Cantidad de citas disponibles', cols: 1, rows: 2 },
          { title: '', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Cantidad de citas disponibles', cols: 1, rows: 2 },
        { title: '', cols: 1, rows: 1 },

      ];
    })
  );

  public GraficaCitas: any[];
  public GraficaCitasDisponibles: Object | any;
  public medicos: any[];
  public codmed: string |any;
  public feccit: Date | any;
  public success: boolean = false;
  public PERMISO_DASHBOARD: string | any;
  constructor(private breakpointObserver: BreakpointObserver,private conf: ConfiguracionesService) 
  {
    this.GraficaCitas = [];
    this.medicos = [];
    this.feccit = new Date();
  }

  ngOnInit() {
  google.charts.load('current', {'packages':['corechart']});
  //Inicializar la libreria y los paquetes de google chart
  google.charts.setOnLoadCallback(() => {
    //Funciones para inicializar los graficos
    this.conf.getGraficaCitas().subscribe(response => {
      if(response.exito === 1) {
        this.GraficaCitas = response.data;
        this.drawChart(this.GraficaCitas);
      } 
    });

    var correo = JSON.parse(localStorage.getItem("usuario")!);
    this.conf.getConfiguraciones('Permisos', correo.correoElectronico).subscribe(response => 
      {
          this.PERMISO_DASHBOARD = response.data.filter((permiso: { sDescripcion: string | string[]; }) => permiso.sDescripcion.includes('VIEW-DASHBOARD-CITAS-TOTAL')).length > 0

          if (this.PERMISO_DASHBOARD)
          {
            this.getMedicos();
            this.conf.getGraficaCitasDisponibles(this.codmed, moment(this.feccit).format('YYYY/MM/DD')).subscribe(response => {
              if(response.exito === 1) {
                this.GraficaCitasDisponibles = response.data;
                this.citasDisponibles();
              }
            });
          }
          else
          {
      
            this.conf.getConfiguraciones('Medico_codigo', correo.correoElectronico).subscribe(response => 
                      {
                        this.medicos = response.data,
                        this.codmed = this.medicos[0].sId

                        this.conf.getGraficaCitasDisponibles(this.codmed, moment(this.feccit).format('YYYY/MM/DD')).subscribe(response => {
                          if(response.exito === 1) {
                            this.GraficaCitasDisponibles = response.data;
                            this.citasDisponibles();
                            this.success= false;
                          }
                          else
                          {
                            this.success = true;
                          }
                        });
                      }
              )      
          }


      })



  });

  }

  drawChart(GraficaCitas: any[]) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Especialidad');
    data.addColumn('number', 'Cantidad de Citas');
    
    for (var i = 0; i < GraficaCitas.length; i++) {
      data.addRow([GraficaCitas[i].sNombre_Especialidad, GraficaCitas[i].nCantidad_citas]);
    }
    
    var options = {
      title: 'Cantidad de citas medicas por especialidad',
      legend: { position: 'bottom' },
      chartArea: { width: '50%', height: '80%' },
      bar: { groupWidth: '50%' },
      height: 500,// ajusta la altura según tus necesidades
      colors: ['skyblue'] ,// arreglo de colores
      animation: {
      duration: 3000, // duración de la animación en milisegundos
      easing: 'out',} // efecto de la animación (linear, in, out, inAndOut)
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  }


  citasDisponibles() {

    console.log(this.GraficaCitasDisponibles)
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Cantidad de citas disponibles', this.GraficaCitasDisponibles.cantidadCitasDisponibles],
      ['Cantidad de citas Reservadas', this.GraficaCitasDisponibles.cantidadCitasReservadasPendientes],
      ['Cantidad de citas atentidas', this.GraficaCitasDisponibles.cantidadCitasAtendidas]
    ]
    );

    var options = {
      title: 'Cantidad de citas disponibles',
      pieHole: 0.4,
      chartArea: { width: '100%', height: '100%' },
      height: 600,// ajusta la altura según tus necesidades
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  getMedicos(){this.conf.getConfiguraciones('Codigo_Medico', moment(this.feccit).format('YYYY/MM/DD'))
                    .subscribe(response => 
                                {
                                  this.medicos = response.data
                                }
                              )
              }

  getLista(row :number): string | any
  {
    switch(row)
    {
      case 1 : return 'chart_div'
      case 2 : return 'donutchart' 
    }
  }
  
}
