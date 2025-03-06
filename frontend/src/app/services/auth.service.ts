import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models-interfaces/Cliente';
import { map, Observable, catchError, of } from 'rxjs';
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
    login(objeto: Login): Observable<ResponseAcceso> {
        return this.http.post<ResponseAcceso>(`${this.baseUrl}login`, objeto).pipe(
            map(response => {
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('userId', this.getUserIdFromToken(response.accessToken));
                localStorage.setItem('userType', this.getUserTypeFromToken(response.accessToken)); // Almacena el tipo de usuario
                return response;
            })
        );
    }
    private getUserIdFromToken(token: string): string {
        const decoded: any = jwtDecode(token);
        return decoded.id;
    }
    private getUserTypeFromToken(token: string): string {
        const decoded: any = jwtDecode(token);
        return decoded.cuilResponsable ? 'barberia' : 'cliente'; // Determina el tipo de usuario
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
    getUserInfo(userId: string): Observable<Cliente | Barberia | null> {
        const token = this.getToken();
        const userType = localStorage.getItem('userType'); // Obtén el tipo de usuario
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const url = userType === 'barberia' 
            ? `${this.baseUrl}barberias/${userId}` 
            : `${this.baseUrl}clientes/${userId}`; // Cambia la URL según el tipo de usuario
        return this.http.get<Cliente | Barberia>(url, { headers }).pipe(
            catchError(error => {
                console.error('Error fetching user info:', error);
                return of(null); // Retorna null en caso de error
            })
        );
    }
}