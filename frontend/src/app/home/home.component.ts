import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swiper from 'swiper';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../services/notificaciones.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'app-home',
    imports: [CommonModule, HeaderComponent, GoogleMapsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {



    @ViewChild('fractionSlideCarousel') fractionSlideCarousel!: ElementRef;
    
    ngOnInit(): void {
        initFlowbite();
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





    //GOOGLE MAPS
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