import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router'; // Importa Router
import Swal from 'sweetalert2';
import { Login } from '../../models-interfaces/Login';
import { AuthService } from '../../services/auth.service';
import { NotificacionesService } from '../../services/notificaciones.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router); // Inyecta Router

  private AuthService = inject(AuthService);

  private notificacionService = inject(NotificacionesService); // Inyectar servicio
  public formBuild = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });

  mostrarPassword: boolean = false;

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }


  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const objeto: Login = {
      email: this.loginForm.value.email,
      contrasena: this.loginForm.value.contrasena
    };

    this.AuthService.login(objeto).subscribe({
      next: (data) => {
        if (data && data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          this.notificacionService.showMessage('¡Has iniciado sesión correctamente!', 'success');
          this.router.navigate(['/']);
        } else {
          this.notificacionService.showMessage('Credenciales incorrectas', 'error');
        }
      },
      error: (error) => {
        console.error("Error al iniciar sesión:", error);

        let message = 'Usuario o contraseña incorrecta.';

        // Verificación de error por falta de conexión a la red
        if (error.status === 0) {  // Esto indica un error de red
          message = 'Has perdido la conexión a Internet. Por favor, intenta más tarde.';
        }
        // Verificación de error de credenciales incorrectas
        else if (error.status === 401) {  // Esto generalmente es un código de error para "Unauthorized"
          message = 'Usuario o contraseña incorrecta.';
        }

        // Muestra el mensaje de error adecuado
        this.notificacionService.showMessage(message, 'error');
      }
    });
  }


}