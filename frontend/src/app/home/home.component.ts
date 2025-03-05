import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swiper from 'swiper';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {



    private notificacionService = inject(NotificacionesService); // Inyectar servicio

    @ViewChild('fractionSlideCarousel') fractionSlideCarousel!: ElementRef;


    constructor(private authService: AuthService) { }

    isLoggedIn: boolean = false;

    cerrarSesion(): void {
        this.authService.logout(); // Llama al servicio de logout
        this.isLoggedIn = false;   // Actualiza la variable para reflejar el cambio en la UI
        this.notificacionService.showMessage('¡Has cerrado sesión correctamente!', 'success'); // Muestra la notificación
    }


    ngOnInit(): void {
        initFlowbite();
        this.isLoggedIn = this.authService.isAuthenticated();
    }

    ngAfterViewInit(): void {
        this.initSwiper();
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
}