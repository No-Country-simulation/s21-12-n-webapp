import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 
import { CommonModule } from '@angular/common';

import { NotificacionesService } from '../../../services/notificaciones.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-turno-cliente',
  imports: [CommonModule],
  templateUrl: './turno-cliente.component.html',
  styleUrl: './turno-cliente.component.css'
})
export class TurnoClienteComponent {
  turnos: any[] = [];

    constructor(private authService: AuthService,
        private notificacionService: NotificacionesService,
        private route: ActivatedRoute // Inyectar ActivatedRoute
    ) { }

    isModalOpen: boolean = false;
    openModal() {
      this.isModalOpen = true;
    }
    closeModal() {
      this.isModalOpen = false;
    }
    submitTurno() {
      // Lógica para crear el nuevo turno
      console.log('Nuevo turno creado');
      this.closeModal(); // Cierra el modal después de crear el turno
    }
    
    ngOnInit() {
        this.cargarTurnos();
    }

    cargarTurnos() {
        this.authService.getTurnos().subscribe(turnos => {
            this.turnos = turnos;
        });
    }
    confirmarTurno(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción confirmara tu turno.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'No, cancelar',
            background: '#000', // Fondo negro
            color: '#fff' // Texto en blanco para mejor visibilidad
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.confirmarTurno(id).subscribe(response => {
                    if (response) {
                        this.notificacionService.showMessage('Turno confirmado con éxito', 'success');
                        this.cargarTurnos(); // Recargar lista de turnos
                    } else {
                        this.notificacionService.showMessage('Hubo un problema al confirmar el turno', 'error');
                    }
                });
            }
        });
    }

     cancelarTurno(id: number) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción cancelará tu turno.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, cancelar',
                cancelButtonText: 'No, mantener',
                background: '#000', // Fondo negro
                color: '#fff' // Texto en blanco para mejor visibilidad
            }).then((result) => {
                if (result.isConfirmed) {
                    this.authService.cancelarTurno(id).subscribe(response => {
                        if (response) {
                            this.notificacionService.showMessage('Turno cancelado con éxito', 'success');
                            this.cargarTurnos(); // Recargar lista de turnos
                        } else {
                            this.notificacionService.showMessage('Hubo un problema al cancelar el turno', 'error');
                        }
                    });
                }
            });
        }
}
