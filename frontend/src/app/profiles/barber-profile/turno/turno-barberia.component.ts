import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../services/notificaciones.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Barberia } from '../../../models-interfaces/Barberia';
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
    selectedDate: string = ''; // Cambiado a selectedDate
    selectedTime: string = '';
    horarios: any[] = []; // Propiedad para almacenar los horarios de la barbería
    availableTimes: string[] = []; // Horas disponibles para reservar

    fechasDisponibles: string[] = [];

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
            // Asegúrate de que fechasDisponibles se llene correctamente
            this.fechasDisponibles = horarios.map(horario => {
                // Extraer solo la fecha en formato 'YYYY-MM-DD'
                return new Date(horario.fecha).toISOString().split('T')[0]; // Ajusta esto según el formato que necesites
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
            this.turnos = turnos;
        });
    }
    generarHorasDisponibles() {
        this.availableTimes = []; // Reiniciar las horas disponibles
        const horario = this.horarios[0]; // Suponiendo que solo hay un horario por barbería
        if (horario) {
            const horaInicio = new Date(horario.horaInicio);
            const horaFin = new Date(horario.horaFin);
            // Generar horas disponibles en intervalos de 30 minutos, por ejemplo
            for (let hour = horaInicio.getHours(); hour <= horaFin.getHours(); hour++) {
                for (let minute = 0; minute < 60; minute += 30 ) { // Cambia 30 por el intervalo deseado
                    this.availableTimes.push(`${hour}:${minute.toString().padStart(2, '0')}`);
                }
            }
        }
    }
    crearTurno() {
        if (!this.selectedDate || !this.selectedTime) {
            this.notificacionService.showMessage('Seleccione un día y una hora', 'error');
            return;
        }
    
        // Asegúrate de que selectedTime tenga el formato correcto (ej. "15:00")
        const formattedDate = this.selectedDate; // Asegúrate de que esté en formato 'YYYY-MM-DD'
        const formattedTime = this.selectedTime; // Debe estar en 'HH:mm'
    
        // Combina fecha y hora en formato ISO 8601
        const fechaTurnoISO = `${formattedDate}T${formattedTime}:00`; // Esto da como resultado 'YYYY-MM-DDTHH:mm:ss'
    
        // Separar la hora en horas y minutos
        const [hours, minutes] = formattedTime.split(':').map(Number);
    
        // Crear objetos Date para horaInicio y horaFin
        const horaInicio = new Date(0, 0, 0, hours, minutes); // Usamos una fecha base arbitraria, ya que solo nos importa la hora
        const horaFin = new Date(0, 0, 0, hours, minutes); // Puedes ajustarlo si la hora de fin es diferente
    
        const nuevoTurno = {
            barberia_id: Number(this.barberId),
            cliente_id: Number(this.userId),
            fechaTurno: fechaTurnoISO, // Usa el formato ISO
            horaInicio: horaInicio.toISOString(), // Convertir a ISO
            horaFin: horaFin.toISOString(),   // Convertir a ISO
            estado: 'RESERVADO',
            metodoPago: 'EFECTIVO'
        };
    
        this.authService.crearTurno(nuevoTurno).subscribe({
            next: () => {
                this.notificacionService.showMessage('Turno creado con éxito', 'success');
                this.closeModal();
                this.cargarTurnos(); // Recargar turnos
            },
            error: (err) => {
                console.error('Error al crear el turno:', err);
                this.notificacionService.showMessage('Error al crear el turno', 'error');
            }
        });
    }
    // Función para verificar si el usuario es dueño del perfil
    esPropietario(): boolean {
        // Aquí deberías implementar la lógica que determine si el usuario es propietario.
        // Por ejemplo, podrías comparar el userId con el id del barbero.
        return this.userId === this.barberId; // Asegúrate de que barberId sea del mismo tipo que userId.
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