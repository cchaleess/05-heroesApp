import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private matDialog: MatDialog) { }
           

  

  ngOnInit(): void {


    if(!this.router.url.includes('editar')){ return; }


    this.activatedRoute.params
    .pipe(
      switchMap ( ({id} ) => this.heroeService.getHeroeById(id))) 
    .subscribe(heroe => this.heroe = heroe);



  }


  publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
    
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  

  agregarHeroe() {
    
    if (this.heroe.superhero.trim().length === 0){ return; }
    /*Si hay un id, es una actualización ya que el id me lo 
    devuelve el servicio de heroes desde la base de datos*/
    if (this.heroe.id) {
      this.heroeService.updateHeroe(this.heroe)
      .subscribe(heroe => {
        this.mostrarSnack('Heroe actualizado');
        console.log("Actualizando: ", heroe);
      }       
        );
    }
    else {
    this.heroeService.createHeroe(this.heroe)
    .subscribe( heroe => { 
      console.log("Agregando: ",heroe);
      this.mostrarSnack('Heroe agregado');
      this.router.navigate(['/heroes/editar', heroe.id]);
    })
  }
}

  borrarHeroe() {

    this.matDialog.open(ConfirmarComponent, {
      width: '350px',
      data: this.heroe
    }).afterClosed()
    .subscribe(result => {
      if (result) {
       /*  this.heroeService.deleteHeroe(this.heroe.id)
        .subscribe(() => {
          this.mostrarSnack('Heroe borrado');
          this.router.navigate(['/heroes']);
        }
        ); */
        console.log(result);
      }
    }
    );

    this.router.navigate(['/heroes']);
  }

  mostrarSnack(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

}
