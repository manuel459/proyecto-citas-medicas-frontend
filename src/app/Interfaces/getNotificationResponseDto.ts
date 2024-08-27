export interface GetNotificationResponseDto {
    id: number;
    message: string;
    state: number;
    id_rol_receptor: string | null;
    nombre_rol_receptor: string | null;
    id_user_receptor: number | null;
    nombre_user_receptor: string | null;
    id_medico_receptor: string | null;
    nombre_medico_receptor: string | null;
    id_rol_emisor: string | null;
    nombre_rol_emisor: string | null;
    id_user_emisor: number | null;
    nombre_user_emisor: string | null;
    createdAt: string;
}