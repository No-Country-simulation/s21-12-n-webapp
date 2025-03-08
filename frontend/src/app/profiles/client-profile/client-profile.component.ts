import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CatalogComponent } from '../barber-profile/catalog/catalog.component';
import { CommentsComponent } from '../barber-profile/comments/comments.component'; 
import { NotificacionesService } from '../../services/notificaciones.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { ClientProfileService } from '../../services/client-profile.service';

@Component({
  selector: 'app-cliente-profile',
  imports: [CommonModule, RouterModule, CatalogComponent, 
    CommentsComponent, HeaderComponent],
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
   clientProfile:any;
    errorMessage: string = '';
    id!: string;
  
    selectedContent: string = 'catalog'
  
    selectContent(content: string){
      this.selectedContent = content
    }
  
    constructor(
      private route: ActivatedRoute,
      private clientProfileService: ClientProfileService,
      private location: Location,
      private router: Router,
      private notificacionService: NotificacionesService
    ){}
  
    ngOnInit(): void{
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id')!;
       // console.log('ID obtenido', this.id)
        this.getProfileJson()
        // this.getProfile
      })
    }
  
    getProfile(){
      this.clientProfileService.getClientProfile(this.id).subscribe({
        next: (data) => {
          this.clientProfile = data
          this.errorMessage = ''
        },
        error: (err) => {
          this.clientProfile = null;
          this.errorMessage = 'No encontramos el cliente'
        }
      })
    }
    
    getProfileJson() {
      this.clientProfileService.getClient(this.id).subscribe({
          next: (data) => {
              this.clientProfile = data;
              this.errorMessage = '';
          },
          error: (err) => {
              this.clientProfile = null;
              this.errorMessage = 'No tienes permiso para ver esta cuenta';
              
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