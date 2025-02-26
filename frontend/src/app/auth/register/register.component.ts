import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router); // Asegúrate de inyectar el Router
  selectedRole: string = 'cliente'; // Inicializa con 'cliente'


  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(11), Validators.pattern(/^\d{11}$/)]],
    CUIT: [''], // Solo para barbería
  }, { validators: this.passwordsMatchValidator() });




  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }



  selectRole(role: string) {
    this.selectedRole = role;
    this.updateCUITValidators();
  }
  private updateCUITValidators() {
    const cuitControl = this.registerForm.get('CUIT');
    if (this.selectedRole === 'barberia') {
      cuitControl?.setValidators([Validators.required]); // Hacer CUIT obligatorio
    } else {
      cuitControl?.clearValidators(); // Limpiar validaciones si no es barbería
    }
    cuitControl?.updateValueAndValidity(); // Actualizar el estado del control
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Formulario enviado con éxito:', this.registerForm.value);

      Swal.fire({
        title: 'Registro Exitoso!',
        text: 'Te has registrado correctamente.',
        imageUrl: 'check.png',
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
      this.registerForm.markAllAsTouched();
    }
  }
}