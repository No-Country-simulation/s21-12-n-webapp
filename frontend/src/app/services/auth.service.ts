import { Injectable, inject} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models-interfaces/Cliente';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../models-interfaces/ResponseAcceso';
import { Login } from '../models-interfaces/Login';
import { Router } from '@angular/router';
import { Barberia } from '../models-interfaces/Barberia';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor(private router: Router) {}

  registroCliente(objeto: Cliente): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}clientes/register`, objeto);
  }
  registroBarberia(objeto: Barberia): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}barberias/register`, objeto);
  }

  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}login`, objeto);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay un token, false si no
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/']); // Redirige al login
  }
}
