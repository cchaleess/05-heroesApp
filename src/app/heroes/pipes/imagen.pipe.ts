import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    //Si no tiene imagen, o se esta creando un registro devuelve una imagen por defecto
    if (!heroe.id && !heroe.alt_img ) {
      return 'assets/assets/assets/no-image.png';
    }else if(heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }
}
