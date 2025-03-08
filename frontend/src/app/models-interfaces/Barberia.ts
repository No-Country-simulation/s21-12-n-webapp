export interface Barberia{
  id?: string;
    email: string,
    imagen: string,
    contrasena: string,
    telefono: string,
    nombreBarberia: string,
    cuilResponsable: string,
    direccion: string,
    descripcion: string,
    horario: string,
  }


  //export interface Horario {
  //  fecha: string; // Puedes usar string o Date, pero asegúrate de que coincida con el formato de la API
  //  horaInicio: string; // Igual que fecha
  //  horaFin: string; // Igual que fecha
  //  estado: string; // "DISPONIBLE"
  //}
  //
  //export interface Barberia {
  //  email: string;
  //  contrasena: string;
  //  telefono: string;
  //  nombreBarberia: string;
  //  cuilResponsable: string;
  //  direccion: string;
  //  descripcion: string;
  //  horarios: Horario[]; // Cambiado a un array de Horario
  //}  