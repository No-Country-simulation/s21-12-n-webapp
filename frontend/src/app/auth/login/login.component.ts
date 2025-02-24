import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule], // Agrega ReactiveFormsModule y CommonModule a imports
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router); // Inyecta Router

  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(6)]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario de inicio de sesión válido:', this.loginForm.value);
      // Aquí iría la lógica para autenticar al usuario
      this.router.navigate(['/dashboard']).then(() => {
        location.reload();
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}