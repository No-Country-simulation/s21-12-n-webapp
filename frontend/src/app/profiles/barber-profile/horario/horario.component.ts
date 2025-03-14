import { Component, OnInit } from '@angular/core';
import { BarberProfileService } from '../../../services/barber-profile.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
@Component({
  selector: 'app-horario',
  imports: [CommonModule],
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  barberProfile: any;
  errorMessage: string = '';
  id!: string;

  selectedContent: string = 'horario'

  selectContent(content: string) {
    this.selectedContent = content
  }

  constructor(
    private route: ActivatedRoute,
    private barberProfileService: BarberProfileService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      // console.log('ID obtenido', this.id)
      this.getProfileJson()
      // this.getProfile
    })
  }

  getProfile() {
    this.barberProfileService.getBarberProfile(this.id).subscribe({
      next: (data) => {
        this.barberProfile = data
        this.errorMessage = ''
      },
      error: (err) => {
        this.barberProfile = null;
        this.errorMessage = 'No encontramos la barbería'
      }
    })
  }

  getProfileJson() {
    this.barberProfileService.getBarbers(this.id).subscribe({
      next: (data) => {
       // Con este codigo muestro fechas actuales
       //  const now = new Date();
  
      //  data.horarios = data.horarios.filter((horario: any) => {
      //    const fechaHorario = new Date(horario.fecha);
  //
      //    // Si la fecha es hoy o futura, mostrarla
      //    return (
      //      fechaHorario.toDateString() === now.toDateString() || // Mostrar fechas de hoy
      //      fechaHorario > now // Mostrar fechas futuras
      //    );
      //  });
  
        this.barberProfile = data;
        this.errorMessage = '';
      },
      error: (err) => {
        this.barberProfile = null;
        this.errorMessage = 'Esta barbería no existe';
        this.router.navigate(['/']);
      }
    });
  }
  
  

  goBack(): void {
    this.router.navigate(['']); // Siempre redirige a la ruta de inicio
  }
}
