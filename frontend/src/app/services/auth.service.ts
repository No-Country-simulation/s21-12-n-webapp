import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models-interfaces/Cliente';
import { Observable } from 'rxjs';
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

    constructor(private router: Router) {}

    registroCliente(objeto: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.baseUrl}clientes/register`, objeto);
    }

    registroBarberia(objeto: Barberia): Observable<ResponseAcceso> {
        return this.http.post<ResponseAcceso>(`${this.baseUrl}barberias/register`, objeto);
    }

    login(objeto: Login): Observable<ResponseAcceso> {
        return this.http.post<ResponseAcceso>(`${this.baseUrl}login`, objeto);
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
}