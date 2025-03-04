import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
    selector: 'app-register',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        GoogleMapsModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    selectedRole: string = 'cliente'; 
    currentPage: number = 1; 
    registerForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/), Validators.minLength(12), Validators.maxLength(15)]],
        CUIT: [''], 
        address: [''], 
        teamSize: [''], 
        horario: [''], 
    }, { validators: this.passwordsMatchValidator() });

   
    days = [
        { name: 'Lunes', active: false, hours: '' },
        { name: 'Martes', active: false, hours: '' },
        { name: 'Miércoles', active: false, hours: '' },
        { name: 'Jueves', active: false, hours: '' },
        { name: 'Viernes', active: false, hours: '' },
        { name: 'Sábado', active: false, hours: '' },
        { name: 'Domingo', active: false, hours: '' },
    ];

    showModal = false;
    selectedDay: any;

    openModal(day: any) {
        this.selectedDay = day;
        this.showModal = true;
    }


    closeModal() {
        this.showModal = false;
    }
    
    saveHours() {
        if (this.selectedDay) {
            const startTimeHour = parseInt((document.querySelector('select[name="startTimeHour"]') as HTMLSelectElement).value, 10);
            const startTimeMinute = parseInt((document.querySelector('select[name="startTimeMinute"]') as HTMLSelectElement).value, 10);
            const endTimeHour = parseInt((document.querySelector('select[name="endTimeHour"]') as HTMLSelectElement).value, 10);
            const endTimeMinute = parseInt((document.querySelector('select[name="endTimeMinute"]') as HTMLSelectElement).value, 10);
    
            // Validación: la hora de cierre debe ser posterior a la de apertura
            if (endTimeHour < startTimeHour || (endTimeHour === startTimeHour && endTimeMinute <= startTimeMinute)) {
                alert('La hora de cierre debe ser posterior a la hora de apertura.');
                return; // Detiene la ejecución si la validación falla
            }
    
            this.selectedDay.hours = `${this.pad(startTimeHour)}:${this.pad(startTimeMinute)} - ${this.pad(endTimeHour)}:${this.pad(endTimeMinute)}`;
    
            // Actualizar el campo 'horario' en el formulario
            const horariosActivos = this.days
                .filter(day => day.active && day.hours)
                .map(day => `${day.name}: ${day.hours}`)
                .join(', ');
    
            this.registerForm.get('horario')?.setValue(horariosActivos);
            this.registerForm.get('horario')?.updateValueAndValidity();
    
            this.showModal = false;
        }
    }
    
    // Función auxiliar para agregar ceros a la izquierda (por ejemplo, 9 -> 09)
    pad(num: number): string {
        return num.toString().padStart(2, '0');
    }
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
        this.updateBarberiaValidators();
    }
    private updateBarberiaValidators() {
        const cuitControl = this.registerForm.get('CUIT');
        const addressControl = this.registerForm.get('address');
        const teamSizeControl = this.registerForm.get('teamSize');
        const horarioControl = this.registerForm.get('horario');
        if (this.selectedRole === 'barberia') {
            cuitControl?.setValidators([Validators.required]);
            addressControl?.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9,. -]*$/)]);
            teamSizeControl?.setValidators([Validators.required]);
            horarioControl?.setValidators([Validators.required]);
        } else {
            cuitControl?.clearValidators();
            addressControl?.clearValidators();
            teamSizeControl?.clearValidators();
            horarioControl?.clearValidators();
        }
        
        cuitControl?.updateValueAndValidity();
        addressControl?.updateValueAndValidity();
        teamSizeControl?.updateValueAndValidity();
        horarioControl?.updateValueAndValidity();
    }
    onSubmit(): void {
        if (this.registerForm.valid) {
            // Aquí puedes manejar los datos del formulario
            const formData = this.registerForm.value; // Obtén los datos del formulario
            console.log('Formulario enviado con éxito:', formData);
            // Aquí puedes hacer algo con los datos, como guardarlos en localStorage o procesarlos
            localStorage.setItem('userData', JSON.stringify(formData)); // Ejemplo de guardado en localStorage
            // Mostrar mensaje de éxito
            Swal.fire({
                title: 'Registro Exitoso!',
                text: 'Te has registrado correctamente.',
                imageUrl: 'assets/check.png',
                imageWidth: 100,
                imageHeight: 100,
                confirmButtonText: 'Aceptar',
                background: '#000',
                color: '#fff',
                confirmButtonColor: '#FFD700',
                didClose: () => {
                    this.router.navigate(['/']).then(() => {});
                },
            });
        } else {
            this.registerForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
        }
    }
   
    //GOOGLE MAPS
    center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
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