import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { appsettings } from '../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  getCliente(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const userId = localStorage.getItem('userId');

    if (userId !== id) {
        return new Observable((observer) => {
            observer.error(new Error('No tienes permiso para ver este cliente'));
        });
    }

    return this.http.get(`${this.baseUrl}clientes/${id}`, { headers }).pipe(
        catchError((err: Error) => {
            console.error('Error al obtener cliente:', err);
            return new Observable((observer) => {
                observer.error(err);
            });
        })
    );
  }
}
