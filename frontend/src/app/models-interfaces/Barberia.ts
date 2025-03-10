export interface HorarioBarberia {
  id: number;
  barberiaId: number;
  fecha: string;  // Podrías convertirla a Date si es necesario
  horaInicio: string;  // Convertir a Date si lo deseas
  horaFin: string;  // Convertir a Date si lo deseas
  estado: string;
}

export interface Barberia {
  id?: string;
  email: string;
  fotoPerfil: string;
  contrasena: string;
  telefono: string;
  nombreBarberia: string;
  cuilResponsable: string;
  direccion: string;
  descripcion: string;
  horario: string;
  horariosDisponibles?: HorarioBarberia[]; // <-- Aquí se asocian los horarios
}



  //export interface Horario {
  //  fecha: string; // Puedes usar string o Date, pero asegúrate de que coincida con el formato de la API
  //  horaInicio: string; // Igual que fecha
  //  horaFin: string; // Igual que fecha
  //  estado: string; // "DISPONIBLE"
  //}
  //
  //export interface Barberia {
  //  id?: string;
  //  email: string;
  //  contrasena: string;
  //  telefono: string;
  //  nombreBarberia: string;
  //  cuilResponsable: string;
  //  direccion: string;
  //  descripcion: string;
  //  horarios: Horario[]; // Cambiado a un array de Horario
  //}  