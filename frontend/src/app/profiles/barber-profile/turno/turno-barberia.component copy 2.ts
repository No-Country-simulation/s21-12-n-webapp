import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../services/notificaciones.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-turno-barberia',
    imports: [CommonModule, FormsModule],
    templateUrl: './turno-barberia.component.html',
    styleUrls: ['./turno-barberia.component.css']
})
export class TurnoBarberiaComponent implements OnInit {
    @Input() barberId!: string; // ID del barbero
    turnos: any[] = [];
    userId: string | null = null;
    isModalOpen: boolean = false;
    selectedDay: string = '';
    selectedTime: string = '';
    horarios: any[] = []; // Propiedad para almacenar los horarios de la barbería
    availableTimes: string[] = []; // Horas disponibles para reservar
    turno = {
        barberia_id: 0,
        cliente_id: 0,
        fechaTurno: '',
        horaInicio: '',
        horaFin: '',
        estado: 'DISPONIBLE',
        metodoPago: 'EFECTIVO'
    };
    constructor(
        private authService: AuthService,
        private notificacionService: NotificacionesService
    ) { }
    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.cargarTurnos();
        if (this.barberId) { // Asegúrate de que barberId no sea undefined o null
            this.obtenerHorariosBarberia();
        }
    }
    obtenerHorariosBarberia() {
        this.authService.getHorariosPorBarberia(Number(this.barberId)).subscribe(horarios => {
            this.horarios = horarios;
        });
    }
    openModal() {
        this.isModalOpen = true;
        this.generarHorasDisponibles(); // Generar horas disponibles al abrir el modal
    }
    closeModal() {
        this.isModalOpen = false;
    }
    cargarTurnos() {
        this.authService.getTurnos().subscribe(turnos => {
            this.turnos = turnos;
        });
    }
    generarHorasDisponibles() {
        this.availableTimes = []; // Reiniciar las horas disponibles
        const horario = this.horarios[0]; // Suponiendo que solo hay un horario por barbería
        if (horario) {
            const horaInicio = new Date(horario.horaInicio);
            const horaFin = new Date(horario.horaFin);
            // Generar horas disponibles solo con horas enteras
            for (let hour = horaInicio.getHours(); hour < horaFin.getHours(); hour++) {
                this.availableTimes.push(`${hour}:00`); // Solo agregar horas enteras
            }
        }
    }
    crearTurno() {
        if (!this.selectedDay || !this.selectedTime) {
            this.notificacionService.showMessage('Seleccione un día y una hora', 'error');
            return;
        }
        const nuevoTurno = {
            barberId: this.barberId,
            userId: this.userId,
            dia: this.selectedDay,
            hora: this.selectedTime
        };
        this.authService.crearTurno(nuevoTurno).subscribe({
            next: () => {
                this.notificacionService.showMessage('Turno creado con éxito', 'success');
                this.closeModal();
                this.cargarTurnos(); // Recargar turnos
            },
            error: () => {
                this.notificacionService.showMessage('Error al crear el turno', 'error');
            }
        });
    }

    // Función para verificar si el usuario es dueño del perfil
    esPropietario(): boolean {
        return this.userId === this.userId;
    }
    guardarTurno() {
        this.turno.barberia_id = Number(this.barberId); // <-- Usa 'barberId' correctamente
        this.turno.fechaTurno = new Date().toISOString(); // Puedes adaptarlo según la selección
        this.turno.horaInicio = new Date().toISOString(); // Ajusta esto según la selección
        this.turno.horaFin = new Date().toISOString(); // Ajusta esto según la selección
        this.turno.estado = 'DISPONIBLE';
        this.turno.metodoPago = 'EFECTIVO';
      
        this.authService.crearTurno(this.turno).subscribe(response => {
          if (response) {
            console.log('Turno creado con éxito:', response);
            this.closeModal();
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