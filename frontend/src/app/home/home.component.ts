import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swiper from 'swiper';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../services/notificaciones.service';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { Barberia } from '../models-interfaces/Barberia';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [CommonModule, HeaderComponent, GoogleMapsModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    @ViewChild('fractionSlideCarousel') fractionSlideCarousel!: ElementRef;
    barberias: Barberia[] = []; // Propiedad para almacenar las barberías

    filteredBarberias: Barberia[] = []; // Lista filtrada


    errorMessage: string = ''; // Mensaje de error
    
    constructor(
        private authService:  AuthService, 
        private router: Router, 
        private notificacionService: NotificacionesService,
        private route: ActivatedRoute // <-- Inyectamos ActivatedRoute
    ) {}
    
    ngOnInit(): void {
        initFlowbite();
        this.loadBarberias();
    
        this.route.paramMap.subscribe(params => {
            const barberiaId = params.get('id'); // Obtiene el ID de la URL
            if (barberiaId) {
                console.log('Barbería seleccionada con ID:', barberiaId);
                // Aquí puedes hacer algo con el ID, como filtrar las barberías o cargar datos específicos
            }
        });
    }
    
    ngAfterViewInit(): void {
        this.initSwiper();
    }
    
    onSearch(): void {
        this.errorMessage = ''; // Limpiar mensaje anterior

        if (!this.authService.isAuthenticated()) {
            this.errorMessage = 'Necesitas estar autenticado para poder realizar búsquedas';
            return; // Detiene la ejecución si no está autenticado
        }

        const searchTerm = (document.getElementById('default-search') as HTMLInputElement).value.toLowerCase().trim();

        if (searchTerm) {
            this.filteredBarberias = this.barberias.filter(barberia => 
                barberia.nombreBarberia.toLowerCase().startsWith(searchTerm) // Filtra solo por las iniciales
            );
        } else {
            this.filteredBarberias = [];
        }
    }
    
    initSwiper(): void {
        const swiper = new Swiper(this.fractionSlideCarousel.nativeElement.querySelector('.swiper'), {
            loop: true,
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
            },
            navigation: {
                nextEl: this.fractionSlideCarousel.nativeElement.querySelector('.swiper-button-next'),
                prevEl: this.fractionSlideCarousel.nativeElement.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: this.fractionSlideCarousel.nativeElement.querySelector('.swiper-pagination'),
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return number;
                },
            },
        });
    }
    loadBarberias(): void {
        this.authService.getBarberias().subscribe({
            next: (barberias) => {
                this.barberias = barberias; // Almacenar barberías en la propiedad
            },
            error: (error) => {
                console.error('Error loading barberías:', error);
                this.notificacionService.showMessage('Error al cargar barberías.', 'error');
            }
        });
    }
    // GOOGLE MAPS
    center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };
    zoom = 12;
    markers: google.maps.MarkerOptions[] = [
        {
            position: { lat: 37.7749, lng: -122.4194 },
            title: 'Marker 1'
        },
        {
            position: { lat: 37.7849, lng: -122.4294 },
            title: 'Marker 2'
        }
    ];
}