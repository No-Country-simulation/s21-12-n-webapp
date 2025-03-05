import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarberProfileService {

  private apiUrl = 'urlapi';
  private jsonUrl = 'assets/data/barber-profile.json';

  constructor(private http: HttpClient){}

  getBarbers(id:string): Observable<any>{
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map( barbers => {
        const barber = barbers.find(barber => barber.id.toString() === id)
        if(!barber){
          throw new Error('Barbería no encontrada')
        }
        return barber
      }),
      catchError((err:Error) => {
        throw err
      })
    )
  }

  getBarberProfile(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError((err:Error) => {
        throw err
      })
    )
  }
  updateBarberProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data);
  }
}
