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
    selectedDate: string = ''; // Cambiar selectedDay por selectedDate
    selectedTime: string = '';
    horarios: any[] = []; // Propiedad para almacenar los horarios de la barbería
    availableDates: { fecha: string, horaInicio: string, horaFin: string }[] = []; // Fechas y horarios disponibles
    availableTimes: string[] = []; // Horas disponibles para reservar
    constructor(
        private authService: AuthService,
        private notificacionService: NotificacionesService
    ) { }
    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.cargarTurnos();
        if (this.barberId) {
            this.obtenerHorariosBarberia();
        }
    }
    obtenerHorariosBarberia() {
        this.authService.getHorariosPorBarberia(Number(this.barberId)).subscribe(horarios => {
            this.horarios = horarios;
            this.generarFechasDisponibles(); // Llamar al método para generar fechas
        });
    }
    generarFechasDisponibles() {
        this.availableDates = []; // Reiniciar las fechas disponibles
        this.horarios.forEach(horario => {
            const fecha = new Date(horario.fecha);
            const horaInicio = new Date(horario.horaInicio);
            const horaFin = new Date(horario.horaFin);
            this.availableDates.push({
                fecha: fecha.toLocaleDateString('es-ES'), // Formato de fecha
                horaInicio: horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Formato de hora
                horaFin: horaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Formato de hora
            });
        });
    }
    openModal() {
        this.isModalOpen = true;
        this.generarHorasDisponibles(); // Generar horas disponibles al abrir el modal
    }
    closeModal() {
        this.isModalOpen = false;
    }
    generarHorasDisponibles() {
        this.availableTimes = []; // Reiniciar las horas disponibles
        const selectedHorario = this.availableDates.find(date => date.fecha === this.selectedDate); // Encuentra el horario correspondiente a la fecha seleccionada
        if (selectedHorario) {
            const horaInicio = new Date(`1970-01-01T${selectedHorario.horaInicio}`);
            const horaFin = new Date(`1970-01-01T${selectedHorario.horaFin}`);
            // Generar horas disponibles solo con horas enteras
            for (let hour = horaInicio.getHours(); hour < horaFin.getHours(); hour++) {
                this.availableTimes.push(`${hour}:00`); // Solo agregar horas enteras
            }
        }
    }
    crearTurno() {
        if (!this.selectedDate || !this.selectedTime) {
            this.notificacionService.showMessage('Seleccione un día y una hora', 'error');
            return;
        }
        const nuevoTurno = {
            barberId: this.barberId,
            userId: this.userId,
            dia: this.selectedDate,
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
    cargarTurnos() {
        this.authService.getTurnos().subscribe(turnos => {
            this.turnos = turnos;
        });
    }
}