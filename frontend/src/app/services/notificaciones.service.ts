import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  showMessage(message: string, type: 'success' | 'error' | 'warning' | 'info' | undefined): void {
    let iconColor: string;
  
    // Personaliza el color de fondo y del icono para la notificación
    if (type === 'success') {
      iconColor = 'green'; // Color del icono
    } else if (type === 'warning') {
      iconColor = 'yellow'; // Icono amarillo
    } else if (type === 'error') {
      iconColor = 'red';
    } else if (type === 'info') {
      iconColor = 'blue';
    } else {
      iconColor = 'gray';
    }
  
    Swal.fire({
      title: message,
      icon: type,
      iconColor: iconColor,
      background: '#000',
      showConfirmButton: false,
      timer: 3000
    });
  }
  
}
