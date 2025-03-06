import { catchError, map, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models-interfaces/Cliente';
import { ResponseAcceso } from '../models-interfaces/ResponseAcceso';
import { Login } from '../models-interfaces/Login';
import { Router } from '@angular/router';
import { Barberia } from '../models-interfaces/Barberia';

@Injectable({
  providedIn: 'root'
})
export class BarberProfileService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;




  getBarbers(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}barberias/${id}`, { headers }).pipe(
      catchError((err: Error) => {
        console.error('Error al obtener barbería:', err);
        throw err;
      })
    );
  }


  getBarberProfile(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}barberias/${id}`, { headers }).pipe(
      catchError((err: Error) => {
        console.error('Error al obtener barbería:', err);
        throw err;
      })
    );
  }


  updateBarberProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, data);
  }
}
