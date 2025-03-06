import { Component, OnInit } from '@angular/core';
import { BarberProfileService } from '../../services/barber-profile.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ErrorComponent } from "../../shared/error/error.component";
import { CatalogComponent } from './catalog/catalog.component';
import { CommentsComponent } from './comments/comments.component';
import { NotificacionesService } from '../../services/notificaciones.service';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  
  selector: 'app-barber-profile',
  imports: [CommonModule, RouterModule, ErrorComponent, CatalogComponent, 
    CommentsComponent, HeaderComponent],
  templateUrl: './barber-profile.component.html',
  styleUrl: './barber-profile.component.css'
})
export class BarberProfileComponent implements OnInit{
  barberProfile:any;
  errorMessage: string = '';
  id!: string;

  selectedContent: string = 'catalog'

  selectContent(content: string){
    this.selectedContent = content
  }

  constructor(
    private route: ActivatedRoute,
    private barberProfileService: BarberProfileService,
    private location: Location,
    private router: Router,
    private notificacionService: NotificacionesService
  ){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      console.log('ID obtenido', this.id)
      this.getProfileJson()
      // this.getProfile
    })
  }

  getProfile(){
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
            this.barberProfile = data;
            this.errorMessage = '';
        },
        error: (err) => {
            this.barberProfile = null;
            this.errorMessage = 'No tienes permiso para ver esta barbería';
            
            // Mostrar alerta con NotificacionService
            this.notificacionService.showMessage(this.errorMessage, 'error');

            // Redirigir al usuario al inicio o a otra página segura
            this.router.navigate(['/']);
        }
    });
}


  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

}
