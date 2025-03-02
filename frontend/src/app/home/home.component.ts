import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swiper from 'swiper';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
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
                    slidesPerView: 3,
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