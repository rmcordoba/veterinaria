// Global types

export type UserRole = 'dueno' | 'veterinario' | 'recepcion';

export interface User {
  id: string;
  email: string;
  nombre: string;
  telefono: string;
  rol: UserRole;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Mascota {
  id: string;
  owner_id: string;
  nombre: string;
  raza: string;
  edad_years: number;
  sexo: 'macho' | 'hembra';
  microchip?: string;
  notas?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Turno {
  id: string;
  mascota_id: string;
  veterinario_id: string;
  owner_id: string;
  fecha_hora: Date;
  estado: 'pendiente' | 'confirmado' | 'completado' | 'cancelado';
  razon_rechazo?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}
