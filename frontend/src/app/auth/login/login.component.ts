import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router'; // Importa Router
import Swal from 'sweetalert2';
import { Login } from '../../models-interfaces/Login';
import { AuthService } from '../../services/auth.service';
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

  public formBuild = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });


  iniciarSesion() {
    if (this.loginForm.invalid) return;

    const objeto: Login = {
      email: this.loginForm.value.email,
      contrasena: this.loginForm.value.contrasena
    }

    this.AuthService.login(objeto).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          localStorage.setItem("token", data.accessToken)
          this.router.navigate(['inicio'])
        } else {
          alert("Credenciales son incorrectas")
        }
      },
      error: (error) => {
        console.log(error.message);
      }
    })
  }


  
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario enviado con éxito:', this.loginForm.value);

      Swal.fire({
        title: '¡Felicidades!',
        text: 'Haz iniciado sesion correctamente',
        imageUrl: 'assets/check.png',
        imageWidth: 100,
        imageHeight: 100,
        confirmButtonText: 'Aceptar',
        background: '#000',
        color: '#fff',
        confirmButtonColor: '#FFD700', // Cambia el color del botón a amarillo (oro)
        didClose: () => {
          this.router.navigate(['/']).then(() => {
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}