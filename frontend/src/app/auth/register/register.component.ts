import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../models-interfaces/Cliente';
import { Barberia } from '../../models-interfaces/Barberia';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Login } from '../../models-interfaces/Login';

@Component({
    selector: 'app-register',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
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



    public registerForm: FormGroup = this.fb.group({
        nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/), Validators.minLength(12), Validators.maxLength(15)]],
    }, { validators: this.passwordsMatchValidator() });

 


    registroCliente() {
        if (this.registerForm.invalid) return;
        const objeto: Cliente = {
            email: this.registerForm.value.email,
            contrasena: this.registerForm.value.contrasena,
            telefono: this.registerForm.value.telefono,
            nombreCompleto: this.registerForm.value.nombreCompleto,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.authService.registroCliente(objeto).subscribe({
            next: (data) => {
                console.log("Registro exitoso:", data);
                this.loginUsuario(objeto.email, objeto.contrasena); // Llama al método de login
            },
            error: (error) => {
                this.notificacionService.showMessage('El email ya está registrado. Por favor, utiliza otro email.', 'error');
            }
        });
    }




    loginUsuario(email: string, contrasena: string) {
        const loginObject: Login = {
            email: email,
            contrasena: contrasena
        };

        this.authService.login(loginObject).subscribe({
            next: (response) => {
                if (response && response.accessToken) {
                    localStorage.setItem('token', response.accessToken);
                    this.notificacionService.showMessage('¡Se ha registrado su cuenta exitosamente!', 'success');
                    this.router.navigate(['/']);
                } else {
                    this.notificacionService.showMessage('Error', 'error');
                }
            },
            error: (error) => {
                console.error("Error en el login:", error);

                let message = 'Error al intentar iniciar sesión después del registro.';

                if (error.status === 0) {
                    message = 'Has perdido la conexión a Internet. Por favor, intenta más tarde.';
                } else if (error.status === 401) {
                    message = 'Credenciales incorrectas.';
                }

                this.notificacionService.showMessage(message, 'error');
            }
        });
    }

    public registerBarberiaForm: FormGroup = this.fb.group({
        nombreBarberia: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/), Validators.minLength(12), Validators.maxLength(15)]],
        cuilResponsable: ['', [Validators.required, this.validateCuil]],
        direccion: [''],
        descripcion: [''],
        horario: [''],
        imagen: [''],
    }, { validators: this.passwordsMatchValidator() });

    validateCuil(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const isValid = /^\d{11}$/.test(value); // Verifica que tenga exactamente 11 dígitos
        return isValid ? null : { invalidCuil: true };
      }
    
    registroBarberia(): void {
        if (this.registerBarberiaForm.valid) {
            const formData: Barberia = {
                nombreBarberia: this.registerBarberiaForm.value.nombreBarberia,
                email: this.registerBarberiaForm.value.email,
                contrasena: this.registerBarberiaForm.value.contrasena,
                telefono: this.registerBarberiaForm.value.telefono,
                cuilResponsable: this.registerBarberiaForm.value.cuilResponsable,
                direccion: this.registerBarberiaForm.value.direccion,
                descripcion: this.registerBarberiaForm.value.descripcion,
                horario: this.registerBarberiaForm.value.horario,
                imagen: this.registerBarberiaForm.value.imagen,
            };

            this.authService.registroBarberia(formData).subscribe({
                next: (response) => {
                    console.log('Registro de barbería exitoso:', response);
                    this.loginUsuario(formData.email, formData.contrasena); // Iniciar sesión después del registro
                },
                error: (error) => {
                    console.error('Error en el registro de barbería:', error);
                    let message = 'Ocurrió un error al registrar la barbería. Inténtalo de nuevo.';

                    if (error.status === 0) {
                        message = 'Has perdido la conexión a Internet. Por favor, intenta más tarde.';
                    } else if (error.status === 409) {
                        message = 'El email ya está registrado. Por favor, utiliza otro email.';
                    } else if (error.status === 500) {
                        if (error.error && error.error.detalle && error.error.detalle.includes('Duplicate entry')) {
                            message = 'El email ya está registrado. Por favor, utiliza otro email.';
                        }
                    }

                    this.notificacionService.showMessage(message, 'error');
                }
            });
        } else {
            this.registerBarberiaForm.markAllAsTouched();
        }
    }


// Agrega este método en tu clase RegisterComponent
hasSelectedDays(): boolean {
    return this.days.some(day => day.active);
}
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
             
                this.notificacionService.showMessage('La hora de cierre debe ser superior a la hora de apertura', 'error');
                return; // Detiene la ejecución si la validación falla
            }

            this.selectedDay.hours = `${this.pad(startTimeHour)}:${this.pad(startTimeMinute)} - ${this.pad(endTimeHour)}:${this.pad(endTimeMinute)}`;

            // Actualizar el campo 'horario' en el formulario
            const horariosActivos = this.days
                .filter(day => day.active && day.hours)
                .map(day => `${day.name}: ${day.hours}`)
                .join(', ');

            this.registerBarberiaForm.get('horario')?.setValue(horariosActivos);
            this.registerBarberiaForm.get('horario')?.updateValueAndValidity();

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
    }
    

}