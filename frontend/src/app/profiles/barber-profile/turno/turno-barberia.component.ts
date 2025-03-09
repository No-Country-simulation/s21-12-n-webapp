import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../services/notificaciones.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-turno-barberia',
    imports: [CommonModule],
    templateUrl: './turno-barberia.component.html',
    styleUrls: ['./turno-barberia.component.css']
})
export class TurnoBarberiaComponent implements OnInit {
    turnos: any[] = [];
    userId: string | null = null; // ID del usuario autenticado
    profileId: string | null = null; // ID 

    constructor(private authService: AuthService,
        private notificacionService: NotificacionesService,
        private route: ActivatedRoute // Inyectar ActivatedRoute
    ) { }

    ngOnInit() {
        this.userId = localStorage.getItem('userId'); // Obtener el ID del usuario autenticado
        this.route.paramMap.subscribe(params => {
            this.profileId = params.get('id'); // Obtener el ID de la URL
        });
        this.cargarTurnos();
    }

    cargarTurnos() {
        this.authService.getTurnos().subscribe(turnos => {
            this.turnos = turnos;
        });
    }

    // Función para verificar si el usuario es dueño del perfil
    esPropietario(): boolean {
        return this.userId === this.profileId;
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
