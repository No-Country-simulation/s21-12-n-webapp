import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models-interfaces/Cliente';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../models-interfaces/ResponseAcceso';
import { Login } from '../models-interfaces/Login';

@Injectable({
     providedIn: 'root'
})
export class AuthService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { }

     registrarse(objeto: Cliente): Observable<ResponseAcceso> {
          return this.http.post<ResponseAcceso>(`${this.baseUrl}clientes/register`, objeto)
     }

     login(objeto: Login): Observable<ResponseAcceso> {
          return this.http.post<ResponseAcceso>(`${this.baseUrl}login`, objeto)
     }

     //validarToken(token: string): Observable<ResponseAcceso> {
     //     return this.http.get<ResponseAcceso>(`${this.baseUrl}Acceso/ValidarToken?token=${token}`)
     //}
}
