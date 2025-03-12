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
            // Obtener la fecha actual en formato 'YYYY-MM-DD'
            const hoy = new Date();
            const fechaActual = hoy.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            // Filtrar las fechas disponibles
            this.fechasDisponibles = horarios
                .map(horario => new Date(horario.fecha).toISOString().split('T')[0]) // Extraer solo la fecha en formato 'YYYY-MM-DD'
                .filter(fecha => fecha >= fechaActual); // Filtrar fechas que son iguales o posteriores a la fecha actual
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
            console.log('Todos los turnos:', turnos); // Ver todos los turnos
            console.log('Barber ID:', this.barberId); // Ver el ID de la barbería
            
            // Obtener la fecha actual en formato 'YYYY-MM-DD'
            const hoy = new Date();
            const fechaActual = hoy.toISOString().split('T')[0]; // 'YYYY-MM-DD'
            // Filtrar los turnos para que solo queden los que pertenecen a la barbería y cuya fecha es hoy o posterior
            this.turnos = turnos.filter(turno => 
                turno.barberia_id === Number(this.barberId) && 
                new Date(turno.fechaTurno).toISOString().split('T')[0] >= fechaActual
            );
            console.log('Turnos filtrados:', this.turnos); // Ver los turnos filtrados
        });
    }
    generarHorasDisponibles() {
        this.availableTimes = []; // Reiniciar las horas disponibles
        const horario = this.horarios[0]; // Suponiendo que solo hay un horario por barbería
        if (horario) {
            const horaInicio = new Date(horario.horaInicio);
            const horaFin = new Date(horario.horaFin);
            
            // Generar horas disponibles solo en horas completas
            for (let hour = horaInicio.getHours(); hour <= horaFin.getHours(); hour++) {
                this.availableTimes.push(hour.toString()); // Agregar solo la hora completa
            }
        }
    }
    crearTurno() {
        if (!this.selectedDate || !this.selectedTime) {
            this.notificacionService.showMessage('Seleccione un día y una hora', 'error');
            return;
        }
        const formattedDate = this.selectedDate; // Asegúrate de que esté en formato 'YYYY-MM-DD'
        const formattedTime = this.selectedTime; // Debe estar en 'HH'
        // Combina fecha y hora en formato ISO 8601
        const fechaTurnoISO = `${formattedDate}T${formattedTime}:00`; // Esto da como resultado 'YYYY-MM-DDTHH:mm:ss'
        // Crear objeto Date para horaInicio y horaFin
        const horaInicio = new Date(fechaTurnoISO);
        
        // Ajustar la hora a UTC-4 (Venezuela)
        horaInicio.setHours(horaInicio.getHours() - 4);
        const horaFin = new Date(horaInicio.getTime() + 30 * 60000); // Suponiendo que la duración es de 30 minutos
        const nuevoTurno = {
            barberia_id: Number(this.barberId),
            cliente_id: Number(this.userId),
            fechaTurno: horaInicio.toISOString(), // Usa el formato ISO
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
    esCliente(clienteId: number): boolean {
        return this.userId === String(clienteId); // Asegúrate de que ambos sean del mismo tipo
    }
    esBarber(): boolean {
        return this.isBarber; // Asumiendo que isBarber se establece correctamente en tu lógica de autenticación
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