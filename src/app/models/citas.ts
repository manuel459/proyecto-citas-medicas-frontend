import { Time } from "@angular/common";

export interface Citas
{
    id: string;
    nombre:string;
    dnip: number;
    codmed: string;
    feccit: string;
    codes:string;
    nEstado: number;
    hora: string;
    //Datos del paciente
    CorreoElectronico: string;
    nombrePaciente: string;

    //Envio de notificación 
    bActiveNotificaciones: Boolean
}

export interface CitasDetail
{
    id: string;
    dnip: number;
    feccit: string;
    hora: string;
    sEstado: string;
    sEstado_Pago: string;
    sNombre_Especialidad: string;
    sNombre_Medico: string;
    sNombre_Paciente: string;
}