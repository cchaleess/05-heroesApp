import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {


  heroe! : Heroe;

  constructor(private activatedRoute : ActivatedRoute, 
              private heroeService : HeroesService,
              private router : Router) { }

  ngOnInit(): void {

    //Leer id de la url y mostrarlo en consola    
    /*const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);*/
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroeById(id))
    ).subscribe(heroe => this.heroe = heroe);
  }

  regresar() : void {
    this.router.navigate(['/heroes/listado']);
  }

}

