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
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        telefono: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/), Validators.minLength(12), Validators.maxLength(15)]],
    }, { validators: this.passwordsMatchValidator() });


    constructor() {
        this.registerBarberiaForm.get('fotoPerfil')?.valueChanges.subscribe(() => {
            this.verificarImagen();
        });
    }

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



    mostrarPassword: boolean = false;

    togglePassword() {
        this.mostrarPassword = !this.mostrarPassword;
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

    showLettersError = false;

    onPasteTelefono(event: ClipboardEvent) {
        const pastedInput: string = (event.clipboardData || (window as any).clipboardData).getData('text');

        // Permite solo números y el símbolo "+" al inicio
        if (!/^\+\d*$/.test(pastedInput)) {
            event.preventDefault(); // Evita pegar caracteres inválidos
            this.showLettersError = true;
            setTimeout(() => {
                this.showLettersError = false;
            }, 3000);
        } else {
            this.showLettersError = false;
        }
    }


    onPaste(event: ClipboardEvent) {
        const pastedInput: string = (event.clipboardData || (window as any).clipboardData).getData('text');
        if (/[a-zA-Z]/.test(pastedInput)) {
            event.preventDefault(); // Evita que se peguen las letras
            this.showLettersError = true; // Muestra el mensaje de error
            setTimeout(() => {
                this.showLettersError = false; // Oculta el mensaje después de un tiempo
            }, 3000); // Oculta el mensaje después de 3 segundos (3000 ms)
        } else {
            this.showLettersError = false; // Asegura que el mensaje esté oculto si no hay letras
        }
    }


    public registerBarberiaForm: FormGroup = this.fb.group({
        nombreBarberia: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        telefono: ['', [Validators.required, Validators.pattern(/^\+\d{1,15}$/), Validators.minLength(12), Validators.maxLength(15)]],
        cuilResponsable: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        direccion: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9\s.,-]+$/), Validators.maxLength(100)]],
        descripcion: [''],
        horario: [''],
        fotoPerfil: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]], // Validación para URL
    }, { validators: this.passwordsMatchValidator() });

    isSubmitting = false;

    registrarBarberiaYAgregarHorario(): void {
        if (this.isSubmitting) return;
        this.isSubmitting = true;
    
        if (!this.horaInicioSeleccionada || !this.horaFinSeleccionada) {
            this.notificacionService.showMessage('Por favor, selecciona horas válidas.', 'error');
            this.isSubmitting = false;
            return;
        }
    
        const [horaInicio] = this.horaInicioSeleccionada.split(':').map(Number);
        const [horaFin] = this.horaFinSeleccionada.split(':').map(Number);
    
        if (horaFin <= horaInicio) {
            this.notificacionService.showMessage('La hora de cierre debe ser superior a la hora de apertura', 'error');
            this.isSubmitting = false;
            return;
        }
    
        if (this.registerBarberiaForm.valid) {
            this.registroBarberia();
        } else {
            this.registerBarberiaForm.markAllAsTouched();
            this.isSubmitting = false;
        }
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
                fotoPerfil: this.registerBarberiaForm.value.fotoPerfil, // Aquí se envía la URL de la imagen
            };

            this.authService.registroBarberia(formData).subscribe({
                next: (response) => {
                    console.log('Registro de barbería exitoso:', response);
                    this.loginUsuario(formData.email, formData.contrasena);

                    setTimeout(() => {
                        this.agregarHorariosSeleccionados();
                        this.isSubmitting = false; // Desbloquea el botón después de completar la operación
                    }, 1000);
                },
                error: (error) => {
                    console.error('Error en el registro de barbería:', error);
                    this.isSubmitting = false; // Desbloquea el botón en caso de error

                    let message = 'Ocurrió un error al registrar la barbería. Inténtalo de nuevo.';
                    if (error.status === 0) {
                        message = 'Has perdido la conexión a Internet. Por favor, intenta más tarde.';
                    } else if (error.status === 409) {
                        message = 'El email ya está registrado. Por favor, utiliza otro email.';
                    } else if (error.status === 500 && error.error?.detalle?.includes('Duplicate entry')) {
                        message = 'El email ya está registrado. Por favor, utiliza otro email.';
                    }

                    this.notificacionService.showMessage(message, 'error');
                }
            });
        } else {
            this.registerBarberiaForm.markAllAsTouched();
            this.isSubmitting = false; // Desbloquea el botón si hay errores en el formulario
        }
    }
    agregarHorariosSeleccionados(): void {
        const userId = this.authService.getUserId();
        if (!userId) {
            console.error('No se encontró el ID del usuario');
            return;
        }
    
        const [horaInicio] = this.horaInicioSeleccionada.split(':').map(Number);
        const [horaFin] = this.horaFinSeleccionada.split(':').map(Number);
    
        this.fechas
            .filter(fecha => fecha.active)
            .forEach(fecha => {
                this.agregarMiHorario(userId, fecha.name, horaInicio, horaFin);
            });
    }
    agregarMiHorario(userId: string, dia: string, horaInicio: number, horaFin: number): void {
        const fechaActual = new Date();
        const fecha = this.obtenerFechaParaDia(fechaActual, dia); // Obtiene la fecha para el día específico
    
        const horario = {
            barberiaId: userId,
            fecha: fecha.toISOString(),
            horaInicio: new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), horaInicio)).toISOString(),
            horaFin: new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), horaFin)).toISOString(),
            estado: 'DISPONIBLE'
        };
    
        this.authService.agregarHorario(horario).subscribe({
            next: (response) => {
                console.log(`Horario para ${dia} agregado con éxito:`, response);
            },
            error: (error) => {
                console.error(`Error agregando horario para ${dia}:`, error);
            }
        });
    }
    obtenerFechaParaDia(fechaActual: Date, dia: string): Date {
        const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const diaActual = fechaActual.getDay();
        const diaSeleccionado = diasSemana.indexOf(dia);
        
        // Calcular la diferencia de días
        let diferencia = diaSeleccionado - diaActual;
        // Si la diferencia es negativa, significa que el día seleccionado ya pasó esta semana
        if (diferencia < 0) {
            diferencia += 7; // Mover a la próxima semana
        }
        const fecha = new Date(fechaActual);
        fecha.setDate(fechaActual.getDate() + diferencia);
        return fecha;
    }
    selectRole(role: string) {
        this.selectedRole = role;
        this.updateBarberiaValidators();
    }
    private updateBarberiaValidators() {
        const cuilResponsableControl = this.registerBarberiaForm.get('cuilResponsable');
        const direccionControl = this.registerBarberiaForm.get('direccion');
        const descripcionControl = this.registerBarberiaForm.get('descripcion');
        const horarioControl = this.registerBarberiaForm.get('horario');
        if (this.selectedRole === 'barberia') {
            cuilResponsableControl?.setValidators([
                Validators.required,
                Validators.pattern(/^\d{11}$/)
            ]);

            direccionControl?.setValidators([Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9,. -]*$/)]);
            descripcionControl?.setValidators([Validators.required]);
            horarioControl?.setValidators([Validators.required]);
        } else {
            cuilResponsableControl?.clearValidators();
            direccionControl?.clearValidators();
            descripcionControl?.clearValidators();
            horarioControl?.clearValidators();
        }

        cuilResponsableControl?.updateValueAndValidity();
        direccionControl?.updateValueAndValidity();
        descripcionControl?.updateValueAndValidity();
        horarioControl?.updateValueAndValidity();
    }





    // Agrega este método en tu clase RegisterComponent
    hasSelectedfechas(): boolean {
        return this.fechas.some(fecha => fecha.active);
    }
    fechas = [
        { name: 'Lunes', active: false, hours: '' },
        { name: 'Martes', active: false, hours: '' },
        { name: 'Miércoles', active: false, hours: '' },
        { name: 'Jueves', active: false, hours: '' },
        { name: 'Viernes', active: false, hours: '' },
        { name: 'Sábado', active: false, hours: '' },
        { name: 'Domingo', active: false, hours: '' },
    ];

    showModal = false;
    selectedfecha: any;



    // Agrega estas propiedades en tu clase
    horaInicioSeleccionada: string = '';
    horaFinSeleccionada: string = '';
    horarioSeleccionado: string = '';
    // Modifica la función saveHours para almacenar las horas seleccionadas
    saveHours() {
        // Obtener las horas y minutos seleccionados
        const horaInicio = parseInt((document.querySelector('select[name="horaInicio"]') as HTMLSelectElement).value, 10);
        const horaFin = parseInt((document.querySelector('select[name="horaFin"]') as HTMLSelectElement).value, 10);
    
        // Validar que la hora de cierre es posterior a la de apertura
        if (horaFin <= horaInicio) {
            this.notificacionService.showMessage('La hora de cierre debe ser superior a la hora de apertura', 'error');
            return;
        }
    
        // Asignar las horas seleccionadas a las propiedades
        this.horaInicioSeleccionada = `${this.pad(horaInicio)}:00`;
        this.horaFinSeleccionada = `${this.pad(horaFin)}:00`;
        this.horarioSeleccionado = `Desde ${this.horaInicioSeleccionada} hasta ${this.horaFinSeleccionada}`;

        // Actualizar el campo 'horario' en el formulario con los horarios seleccionados
        const horariosActivos = this.fechas
            .filter(fecha => fecha.active)
            .map(fecha => `${fecha.name}: ${this.horaInicioSeleccionada} - ${this.horaFinSeleccionada}`)
            .join(', ');
    
        this.registerBarberiaForm.get('horario')?.setValue(horariosActivos);
        this.registerBarberiaForm.get('horario')?.updateValueAndValidity();
    
        // Actualizar la propiedad hours de todas las fechas activas
        this.fechas.filter(fecha => fecha.active).forEach(fecha => {
            fecha.hours = `Desde ${this.horaInicioSeleccionada} hasta ${this.horaFinSeleccionada}`;
        });
    
        this.showModal = false; // Cerrar el modal
    }
    openModal() {
        if (!this.hasSelectedfechas()) {
            this.notificacionService.showMessage('Por favor, selecciona al menos un día antes de registrar el horario.', 'error');
            return;
        }
        this.showModal = true;
    }
    closeModal() {
        this.showModal = false;
    }

    // Función auxiliar para agregar ceros a la izquierda (por ejemplo, 9 -> 09)
    pad(num: number): string {
        return num.toString().padStart(2, '0');
    }

    verificarImagen(): void {
        const url = this.registerBarberiaForm.get('fotoPerfil')?.value;
        if (!url) {
            this.imagenValida = false;
            return;
        }
    
        const img = new Image();
        img.onload = () => {
            this.imagenValida = true;
        };
        img.onerror = () => {
            this.imagenValida = false;
            this.notificacionService.showMessage('La URL de la imagen no es válida o no se puede cargar.', 'error');
        };
        img.src = url;
    }
    imagenValida: boolean = false;
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



}