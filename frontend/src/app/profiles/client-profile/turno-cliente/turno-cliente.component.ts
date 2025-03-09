import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../services/notificaciones.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turno-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './turno-cliente.component.html',
  styleUrl: './turno-cliente.component.css'
})
export class TurnoClienteComponent implements OnInit {
    turnos: any[] = [];
    isModalOpen: boolean = false;
    nuevoTurno: any = {
        fechaTurno: '', // Se debe asignar en el formulario
        horaInicio: '',
        horaFin: '',
        barberiaId: 1,
        clienteId: 0 // Se llenará al autenticarse
    };
    
    horasDisponibles: string[] = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')); // ["00", "01", ..., "23"]

    constructor(
        private authService: AuthService,
        private notificacionService: NotificacionesService,
        private route: ActivatedRoute
    ) { }

    openModal() {
        this.isModalOpen = true;
    }
    
    closeModal() {
        this.isModalOpen = false;
    }

    submitTurno() {
        this.nuevoTurno.clienteId = this.authService.getUserId();
        this.nuevoTurno.horaFin = this.calcularHoraFin(this.nuevoTurno.horaInicio);
        
        this.authService.crearTurno(this.nuevoTurno).subscribe(response => {
            if (response) {
                this.notificacionService.showMessage('Turno reservado con éxito', 'success');
                this.cargarTurnos();
                this.closeModal();
            } else {
                this.notificacionService.showMessage('Error al reservar el turno', 'error');
            }
        });
    }

    calcularHoraFin(horaInicio: string): string {
        const hora = parseInt(horaInicio, 10);
        const horaFin = (hora + 1) % 24;
        return horaFin.toString().padStart(2, '0'); // Agrega el 0 si es menor a 10
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
            text: 'Esta acción confirmará tu turno.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'No, cancelar',
            background: '#000',
            color: '#fff'
        }).then(result => {
            if (result.isConfirmed) {
                this.authService.confirmarTurno(id).subscribe(response => {
                    if (response) {
                        this.notificacionService.showMessage('Turno confirmado con éxito', 'success');
                        this.cargarTurnos();
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
