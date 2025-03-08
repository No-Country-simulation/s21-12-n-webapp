import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-turno-barberia',
  imports: [CommonModule],
    templateUrl: './turno-barberia.component.html',
    styleUrls: ['./turno-barberia.component.css']
})
export class TurnoBarberiaComponent implements OnInit {
    turnos: any[] = [];

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.cargarTurnos();
    }

    cargarTurnos() {
        this.authService.getTurnos().subscribe(turnos => {
            this.turnos = turnos;
        });
    }

    cancelarTurno(id: number) {
        if (confirm('¿Estás seguro de que deseas cancelar este turno?')) {
            this.authService.cancelarTurno(id).subscribe(response => {
                if (response) {
                    alert('Turno cancelado con éxito');
                    this.cargarTurnos(); // Recargar la lista de turnos
                } else {
                    alert('Hubo un problema al cancelar el turno');
                }
            });
        }
    }
}
