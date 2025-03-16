import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../services/notificaciones.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Barberia } from '../../../models-interfaces/Barberia';

interface FechaDisponible {
    nombreDia: string;
    fechaISO: string;
}

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
    selectedDate: FechaDisponible | null = null; // Cambiado a FechaDisponible | null
    selectedTime: string = '';
    horarios: any[] = []; // Propiedad para almacenar los horarios de la barbería
    availableTimes: string[] = []; // Horas disponibles para reservar
    fechasDisponibles: FechaDisponible[] = []; // Cambiado a FechaDisponible[]
    isBarber: boolean = false; // Propiedad para determinar si es barbero
    isLoggedIn: boolean = false;

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
        if (this.barberId) {
            this.obtenerHorariosBarberia();
        }
        this.isLoggedIn = this.authService.isAuthenticated();
        if (this.isLoggedIn) {
            const userId = this.authService.getUserId();
            if (userId) {
                this.authService.getUserInfo(userId).subscribe((user: Barberia | null) => {
                    if (user) {
                        this.isBarber = !!user.cuilResponsable; // Verifica si tiene cuilResponsable
                    }
                });
            }
        }
    }

    obtenerHorariosBarberia() {
        this.authService.getHorariosPorBarberia(Number(this.barberId)).subscribe(horarios => {
            this.horarios = horarios;

            this.fechasDisponibles = horarios.map(horario => {
                const fecha = new Date(horario.fecha);
                const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
                const fechaISO = fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
                return { nombreDia, fechaISO };
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

    cargarTurnos() {
        this.authService.getTurnos().subscribe(turnos => {
          //  console.log('Todos los turnos:', turnos);
          //  console.log('Barber ID:', this.barberId);

            this.turnos = turnos.filter(turno =>
                turno.barberia_id === Number(this.barberId)
            );

            // console.log('Turnos filtrados:', this.turnos);
        });
    }

    generarHorasDisponibles() {
        this.availableTimes = [];
        const horario = this.horarios[0];
        if (horario) {
            const horaInicio = new Date(horario.horaInicio);
            const horaFin = new Date(horario.horaFin);

            for (let hour = horaInicio.getHours(); hour <= horaFin.getHours(); hour++) {
                this.availableTimes.push(hour.toString());
            }
        }
    }

    crearTurno() {
        if (!this.selectedDate) {
            this.notificacionService.showMessage('Seleccione un día', 'error');
            return;
        }
        const fechaISO = this.selectedDate.fechaISO;
        const formattedTime = this.selectedTime;
        // Verifica si formattedTime está en el formato correcto
        const timeParts = formattedTime.split(':');
        let horaInicio: Date;
        // Si la hora es válida, la usamos; si no, asignamos una hora por defecto
        if (timeParts.length === 2 && !isNaN(Number(timeParts[0])) && !isNaN(Number(timeParts[1]))) {
            const fechaTurnoISO = `${fechaISO}T${formattedTime}:00`;
            horaInicio = new Date(fechaTurnoISO);
            
            // Verifica si horaInicio es un valor válido
            if (isNaN(horaInicio.getTime())) {
                // Asignar a medianoche si la hora es inválida
                horaInicio = new Date(`${fechaISO}T00:00:00`);
               // this.notificacionService.showMessage('Hora seleccionada no es válida, se registrará con hora por defecto.', 'warning');
            }
        } else {
            // Asignar a medianoche si el formato no es correcto
            horaInicio = new Date(`${fechaISO}T00:00:00`);
            //this.notificacionService.showMessage('Hora seleccionada no es válida, se registrará con hora por defecto.', 'warning');
        }
        const horaFin = new Date(horaInicio.getTime() + 30 * 60000); // 30 minutos después
        const nuevoTurno = {
            barberia_id: Number(this.barberId),
            cliente_id: Number(this.userId),
            fechaTurno: horaInicio.toISOString(),
            horaInicio: horaInicio.toISOString(),
            horaFin: horaFin.toISOString(),
            estado: 'RESERVADO',
            metodoPago: 'EFECTIVO'
        };
        this.authService.crearTurno(nuevoTurno).subscribe({
            next: () => {
                this.notificacionService.showMessage('Turno creado con éxito', 'success');
                this.closeModal();
                this.cargarTurnos();
            },
            error: (err) => {
                console.error('Error al crear el turno:', err);
                this.notificacionService.showMessage('Error al crear el turno', 'error');
            }
        });
    }
    esPropietario(): boolean {
        return this.userId === this.barberId;
    }

    esCliente(clienteId: number): boolean {
        return this.userId === String(clienteId);
    }

    esBarber(): boolean {
        return this.isBarber;
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
            background: '#000',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.cancelarTurno(id).subscribe(response => {
                    if (response) {
                        this.notificacionService.showMessage('Turno cancelado con éxito', 'success');
                        this.cargarTurnos();
                    } else {
                        this.notificacionService.showMessage('Hubo un problema al cancelar el turno', 'error');
                    }
                });
            }
        });
    }
}