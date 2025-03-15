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
    id!: string;
    constructor(
        private authService: AuthService,
        private notificacionService: NotificacionesService,
        private route: ActivatedRoute
    ) { }


    calcularHoraFin(horaInicio: string): string {
        const hora = parseInt(horaInicio, 10);
        const horaFin = (hora + 1) % 24;
        return horaFin.toString().padStart(2, '0'); // Agrega el 0 si es menor a 10
    }


    ngOnInit(): void {
     
        this.route.paramMap.subscribe(params => {
          this.id = params.get('id')!;
          // console.log('ID obtenido', this.id)
        })
        this.cargarTurnos();
      }

      cargarTurnos() {
        this.authService.getTurnosClientes(this.id).subscribe(turnos => {
            this.turnos = turnos.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Orden descendente
            });
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
