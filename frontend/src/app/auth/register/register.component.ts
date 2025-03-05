import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../models-interfaces/Cliente';
import { Barberia } from '../../models-interfaces/Barberia';
import { NotificacionesService } from '../../services/notificaciones.service';

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
    private notificacionService = inject(NotificacionesService); // Inyectar servicio
    private authService = inject(AuthService);
    selectedRole: string = 'cliente'; 
    currentPage: number = 1; 
    
    

    registerForm: FormGroup = this.fb.group({
        nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/), Validators.minLength(12), Validators.maxLength(15)]],
        CUIT: [''], 
        address: [''], 
        teamSize: [''], 
        horario: [''], 
    }, { validators: this.passwordsMatchValidator() });

   
    //registrarse(){
    //    if(this.registerForm.invalid) return;
//
    //    const objeto:Cliente = {
    //         nombre: this.registerForm.value.nombre,
    //         correo: this.registerForm.value.correo,
    //         clave: this.registerForm.value.clave
    //    }
//
    //    this.authService.registroCliente(objeto).subscribe({
    //         next: (data) =>{
    //              if(data.isSuccess){
    //                   this.router.navigate([''])
    //              }else{
    //                   alert("No se pudo registrar")
    //              }
    //         }, error:(error) =>{
    //              console.log(error.message);
    //         }
    //    })
//
    //}

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
            const contrasena = control.get('contrasena')?.value;
            const confirmPassword = control.get('confirmPassword')?.value;
            return contrasena === confirmPassword ? null : { mismatch: true };
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

 registroCliente(): void {
        if (this.registerForm.valid) {
            // Aquí puedes manejar los datos del formulario
            const formData = this.registerForm.value; // Obtén los datos del formulario
            console.log('Formulario enviado con éxito:', formData);
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

    registroCliente2() {
        if (this.registerForm.invalid) {
          this.registerForm.markAllAsTouched();
          return;
        }
      
        const objeto: Cliente = {
          email: this.registerForm.value.email,
          contrasena: this.registerForm.value.password,
          telefono: this.registerForm.value.telefono,
          nombreCompleto: this.registerForm.value.name,
          createdAt: new Date(), 
          updatedAt: new Date()
        };
      
        this.authService.registroCliente(objeto).subscribe({
          next: (data) => {
            if (data && data.accessToken) {
              localStorage.setItem("token", data.accessToken);
              this.notificacionService.showMessage('¡Te has registrado correctamente!', 'success');
              this.router.navigate(['/']);
            } else {
              this.notificacionService.showMessage('Hubo un problema con el registro. Intenta nuevamente.', 'error');
            }
          },
          error: (error) => {
            console.error("Error al registrar:", error);
            
            // Verifica si el error contiene detalles más específicos
            let message = 'Ocurrió un error al registrar tu cuenta';
      
            if (error.error) {
              if (error.error === 'El correo electrónico ya está registrado.') {
                message = 'El correo electrónico ya está registrado.';
              } else {
                message = error.error; // Muestra el mensaje de error del backend
              }
            }
      
            this.notificacionService.showMessage(message, 'error');
          }
        });
      }
      
      
    registroBarberia(): void {
        if (this.registerForm.valid) {
            // Aquí puedes manejar los datos del formulario
            const formData = this.registerForm.value; // Obtén los datos del formulario
            console.log('Formulario enviado con éxito:', formData);
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