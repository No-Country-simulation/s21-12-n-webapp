import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientProfileService } from '../../services/client-profile.service'; 
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-cliente-profile',
  templateUrl: './cliente-profile.component.html',
  styleUrl: './cliente-profile.component.css'
})
export class ClientProfileComponent implements OnInit {
  clienteProfile: any;
  errorMessage: string = '';
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private clienteProfileService: ClientProfileService,
    private router: Router,
    private notificacionService: NotificacionesService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      console.log('ID obtenido', this.id);
      this.getClienteProfile();
    });
  }

  getClienteProfile() {
    this.clienteProfileService.getCliente(this.id).subscribe({
      next: (data) => {
        this.clienteProfile = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.clienteProfile = null;
        this.errorMessage = 'No tienes permiso para ver este cliente';

        // Mostrar alerta
        this.notificacionService.showMessage(this.errorMessage, 'error');

        // Redirigir al home
        this.router.navigate(['/']);
      }
    });
  }
}
