import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { GoogleMapsModule } from '@angular/google-maps';
@Component({
    selector: 'app-register',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GoogleMapsModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router); // Asegúrate de inyectar el Router
  selectedRole: string = 'cliente'; // Inicializa con 'cliente'

  currentPage: number = 1; // Inicializamos en la primera página

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/)]], // Permite números como +584266796897
    CUIT: [''], // Solo para barbería
    address: [''], // Añadimos el campo de dirección
    teamSize: [''] // Añadimos el campo de tamaño de equipo
  }, { validators: this.passwordsMatchValidator() });


  // ... dentro de tu clase RegisterComponent

nextPage() {
  this.currentPage++;
}

previousPage() {
  this.currentPage--;
}


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
      this.registerForm.markAllAsTouched();
    }
  }

  //GOOGLE MAPS

  center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
  zoom = 12;
 
  markers: google.maps.MarkerOptions[] = [
    {
      position: { lat: 37.7749, lng: -122.4194 },
      title: 'Marker 1'
    },
    {
      position: { lat: 37.7849, lng: -122.4294 },
      title: 'Marker 2'
    }
  ];

}