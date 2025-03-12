export interface Cliente {
     id?: number;
     email: string;
     contrasena: string;
     telefono: string; // Cambia a string porque el backend devuelve el teléfono como string
     nombreCompleto: string;
     createdAt: string;
     updatedAt: string;
 }
 