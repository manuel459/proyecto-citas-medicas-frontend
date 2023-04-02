import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { CiclistaComponent } from './ciclista/ciclista.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministradorRegistroPersonalComponent } from './Administrador/administrador-registro-personal/administrador-registro-personal.component';
import { MenuAdimistradorComponent } from './Administrador/menu-adimistrador/menu-adimistrador.component';
import { MatDialog } from '@angular/material/dialog/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { AdministradorRegistrarNuevaCitaComponent } from './Administrador/administrador-registrar-nueva-cita/administrador-registrar-nueva-cita.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MedicoComponent } from './medico/medico.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DialogmedicoComponent } from './medico/dialog/dialogmedico/dialogmedico.component';
import { AppRoutingModule } from './app-routing.module';
import { DeletemedicoComponent } from './dialogdelete/deletemedico/deletemedico.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { DialogmedicoRevisarComponent } from './medico/dialog/dialogmedico-revisar/dialogmedico-revisar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PacienteComponent } from './paciente/paciente.component';
import { DialogpacienteComponent } from './paciente/dialog/dialogpaciente/dialogpaciente.component';
import { DeletepacienteComponent } from './dialogdelete/deletepaciente/deletepaciente.component';
import { DialogpacienteRevisarComponent } from './paciente/dialog/dialogpaciente-revisar/dialogpaciente-revisar.component';
import { ErrorsPacienteComponent } from './Errors/errors-paciente/errors-paciente.component';
import { ErrorsMedicoComponent } from './Errors/errors-medico/errors-medico.component';
import { CitasComponent } from './citas/citas.component';
import { DialogcitasComponent } from './citas/dialog/dialogcitas/dialogcitas.component';
import { DeletecitasComponent } from './dialogdelete/deletecitas/deletecitas.component';
import { DialogcitasRevisarComponent } from './citas/dialog/dialogcitas-revisar/dialogcitas-revisar.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { JwtInterceptor } from './security/jwt.interceptor';
import { HomeComponent } from './home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { InterceptorService } from './interceptor.service';
import { ErrorsCitasComponent } from './Errors/errors-citas/errors-citas.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ForbiddenComponent } from './common-pages/forbidden/forbidden.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ModuloPagosComponent } from './modulo-pagos/modulo-pagos.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ErrorsDiagnosticoComponent } from './Errors/errors-diagnostico/errors-diagnostico.component';

@NgModule({
  declarations: [
    AppComponent,
    CiclistaComponent,
    AdministradorRegistroPersonalComponent,
    MenuAdimistradorComponent,
    AdministradorRegistrarNuevaCitaComponent,
    MedicoComponent,
    DialogmedicoComponent,
    DeletemedicoComponent,
    SpinnerComponent,
    DialogmedicoRevisarComponent,
    PacienteComponent,
    DialogpacienteComponent,
    DeletepacienteComponent,
    DialogpacienteRevisarComponent,
    ErrorsPacienteComponent,
    ErrorsMedicoComponent,
    CitasComponent,
    DialogcitasComponent,
    DeletecitasComponent,
    DialogcitasRevisarComponent,
    LoginComponent,
    HomeComponent,
    ErrorsCitasComponent,
    DiagnosticoComponent,
    ForbiddenComponent,
    ModuloPagosComponent,
    ErrorsDiagnosticoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule ,
    MatSortModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    TextFieldModule,
    MatSlideToggleModule,
    MatStepperModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
