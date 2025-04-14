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
                // Elimina desfase de zona horaria
                const fechaUTC = new Date(horario.fecha);
                const fechaLocal = new Date(fechaUTC.getTime() + fechaUTC.getTimezoneOffset() * 60000);

                const nombreDia = fechaLocal.toLocaleDateString('es-ES', { weekday: 'long' });
                const fechaISO = fechaLocal.toISOString().split('T')[0];
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
            for (let hour = horaInicio.getHours(); hour < horaFin.getHours(); hour++) {
                const horaFormateada = `${hour.toString().padStart(2, '0')}:00`;
                this.availableTimes.push(horaFormateada);
            }
        }
    }

    toLocalISOString(date: Date): string {
        const pad = (n: number) => n.toString().padStart(2, '0');
        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);
        const dd = pad(date.getDate());
        const hh = pad(date.getHours());
        const min = pad(date.getMinutes());
        const ss = pad(date.getSeconds());
        return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
    }

    private formatearFechaLocal(date: Date): string {
        // Devuelve la fecha y hora en formato: 'yyyy-MM-ddTHH:mm:ss'
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }



    crearTurno() {
        if (!this.selectedDate) {
            this.notificacionService.showMessage('Seleccione un día', 'error');
            return;
        }

        const fechaISO = this.selectedDate.fechaISO;
        const formattedTime = this.selectedTime;

        if (!formattedTime || !formattedTime.includes(':')) {
            this.notificacionService.showMessage('Seleccione una hora válida', 'error');
            return;
        }

        const [year, month, day] = fechaISO.split('-').map(Number);
        const [hour, minute] = formattedTime.split(':').map(Number);

        const horaInicio = new Date(year, month - 1, day, hour, minute);
        const horaFin = new Date(horaInicio.getTime() + 30 * 60000);
        console.log('Fecha local:', this.formatearFechaLocal(horaInicio));
        console.log('Objeto Date:', horaInicio.toString());
        console.log('ISO original:', horaInicio.toISOString());

        const nuevoTurno = {
            barberia_id: Number(this.barberId),
            cliente_id: Number(this.userId),
            fechaTurno: this.formatearFechaLocal(horaInicio),
            horaInicio: this.formatearFechaLocal(horaInicio),
            horaFin: this.formatearFechaLocal(horaFin),

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