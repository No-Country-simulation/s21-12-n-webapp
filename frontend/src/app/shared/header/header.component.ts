import { Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Router } from '@angular/router';
import { Barberia } from '../../models-interfaces/Barberia'; // Asegúrate de importar la interfaz
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Cambié styleUrl a styleUrls
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  
  isBarber: boolean = false; // Propiedad para determinar si es barbero

  constructor(private authService: AuthService, private router: Router, private notificacionService: NotificacionesService) { }
 
  ngOnInit(): void {
    initFlowbite();
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

  cerrarSesion(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.notificacionService.showMessage('¡Has cerrado sesión correctamente!', 'success');
  }


  goToProfileClient() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.router.navigate([`/profile/client/${userId}`]);
    }
  }


  goToProfileBarber() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.router.navigate([`/profile/barber/${userId}`]);
    }
  }
}