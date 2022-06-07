import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroeTarjeta.component.html',
  styles: [
    `
     mat-card {
      margin-top: 20px; 
    }
    `
  ]
})

export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe; 
}
