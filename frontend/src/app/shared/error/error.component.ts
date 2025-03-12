import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [CommonModule,RouterModule],
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  @Input() detalles: string = "Página no encontrada";
}
