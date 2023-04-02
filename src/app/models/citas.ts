import { Time } from "@angular/common";

export interface Citas
{
    id: string;
    nombre:string;
    dnip: number;
    codmed: string;
    feccit: string;
    codes:string;
    estado: number;
    hora: string;
    //Datos del paciente
    CorreoElectronico: string;
    nombrePaciente: string;

    //Envio de notificación 
    bActiveNotificaciones: Boolean
}