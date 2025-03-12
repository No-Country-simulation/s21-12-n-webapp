import { catchError, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class BarberProfileService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;


  getBarbers(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    // Solo agregar el header de autorización si el token está presente
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(`${this.baseUrl}barberias/${id}`, { headers }).pipe(
        catchError((err: Error) => {
            console.error('Error al obtener barbería:', err);
            return new Observable((observer) => {
                observer.error(err);
            });
        })
    );
}
  putBarbers(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario autenticado

    if (userId !== id) {
      return new Observable((observer) => {
        observer.error(new Error('No tienes permiso para ver esta barbería'));
      });
    }

    return this.http.get(`${this.baseUrl}barberias/${id}`, { headers }).pipe(
      catchError((err: Error) => {
        console.error('Error al obtener barbería:', err);
        return new Observable((observer) => {
          observer.error(err);
        });
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
