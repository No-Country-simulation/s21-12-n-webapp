import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models-interfaces/Cliente';
import { map, Observable, catchError, of, throwError } from 'rxjs';
import { ResponseAcceso } from '../models-interfaces/ResponseAcceso';
import { Login } from '../models-interfaces/Login';
import { Router } from '@angular/router';
import { Barberia } from '../models-interfaces/Barberia';
import { jwtDecode } from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
    constructor(private router: Router) { }

    registroCliente(objeto: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.baseUrl}clientes/register`, objeto);
    }
    registroBarberia(objeto: Barberia): Observable<ResponseAcceso> {
        return this.http.post<ResponseAcceso>(`${this.baseUrl}barberias/register`, objeto);
    }
    
    agregarHorario(horario: any): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.post<any>(`${this.baseUrl}horarios`, horario, { headers }).pipe(
            catchError(error => {
                console.error('Error agregando horario:', error);
                return of(null);
            })
        );
    }

    getHorarios(): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.get<any[]>(`${this.baseUrl}horarios`, { headers }).pipe(
            catchError(error => {
                console.error('Error obteniendo horarios:', error);
                return of([]);
            })
        );
    }
    
    getHorariosPorBarberia(barberiaId: number): Observable<any[]> {
        return this.getHorarios().pipe(
            map(horarios => horarios.filter(horario => horario.barberiaId === barberiaId))
        );
    }
    
    
   
    
    login(objeto: Login): Observable<ResponseAcceso> {
        return this.http.post<ResponseAcceso>(`${this.baseUrl}login`, objeto).pipe(
            map(response => {
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('userId', this.getUserIdFromToken(response.accessToken));
                return response;
            })
        );
    }
    


    getBarberias(): Observable<Barberia[]> {
        return this.http.get<Barberia[]>(`${this.baseUrl}barberias`).pipe(
            catchError(error => {
                console.error('Error fetching barberias:', error);
                return of([]); // Retorna un arreglo vacío en caso de error
            })
        );
    }

    
    getTurnos(): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(`${this.baseUrl}turnos`, { headers }).pipe(
            catchError(error => {
                console.error('Error obteniendo turnos:', error);
                return of([]); // Retorna un arreglo vacío en caso de error
            })
        );
    }

    getTurnosClientes(id: string): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(`${this.baseUrl}turnos/${id}`, { headers }).pipe(
            catchError(error => {
                console.error('Error obteniendo turnos:', error);
                return of([]); // Retorna un arreglo vacío en caso de error
            })
        );
    }


    crearTurno(turno: any): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<any>(`${this.baseUrl}turnos/book`, turno, { headers }).pipe(
            catchError(error => {
                console.error('Error creando turno:', error);
                return throwError(error); // Lanza el error nuevamente
            })
        );
    }
    // Método para obtener el cliente_id desde el token
    getClienteId(): number | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            return decoded.clienteId || null; // Asegúrate de que el token tenga el campo `clienteId`
        } catch (error) {
            console.error('Error decoding token', error);
            return null;
        }
    }
    
    
    confirmarTurno(id: number): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.put(`${this.baseUrl}turnos/${id}/confirm`, {}, { headers }).pipe(
            catchError(error => {
                console.error('Error confirmando el turno:', error);
                return of(null);
            })
        );
    }
    
    cancelarTurno(id: number): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.put(`${this.baseUrl}turnos/${id}/cancel`, {}, { headers }).pipe(
            catchError(error => {
                console.error('Error cancelando el turno:', error);
                return of(null);
            })
        );
    }
    
    
    private getUserIdFromToken(token: string): string {
        const decoded: any = jwtDecode(token);
        return decoded.id;
    }
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    getUserId(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            return decoded.id; // Asegúrate de que el token tenga esta propiedad
        } catch (error) {
            console.error('Error decoding token', error);
            return null;
        }
    }
    // Nuevo método para obtener información del usuario
    getUserInfo(userId: string): Observable<Barberia | null> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Barberia>(`${this.baseUrl}barberias/${userId}`, { headers }).pipe(
            catchError(error => {
             //   console.error('Error fetching user info:', error);
                return of(null); // Retorna null en caso de error
            })
        );
    }
}