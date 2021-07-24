import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }

    .hero_container {
      width: 100%;
    }
  `]
})
export class AgregarComponent implements OnInit {
  
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroeService:   HeroesService,
               private activatedRoute: ActivatedRoute,
               private router:         Router,
               private snackBar:       MatSnackBar,
               private dialog:         MatDialog) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
        .pipe(
          switchMap(({id})=> this.heroeService.getHeroePorId( id ))
        )
       .subscribe( heroe => this.heroe = heroe);
  }

  guardar() {
    if( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if( this.heroe.id ){
      this.heroeService.actualizarHeroe( this.heroe )
            .subscribe( () => this.mostrarSnackBar('Registro actalizado') );
    }else{
      this.heroeService.agregarHeroe( this.heroe )
            .subscribe( heroe => {
              this.router.navigate(['/heroes/editar', heroe.id]);
              this.mostrarSnackBar('Registro creado');
            })
    }

    console.log(this.heroe.id)

    // this.heroeService.agregarHeroe( this.heroe )
    //   .subscribe( resp => {
    //     console.log('Respuesta', resp);
    //   });

  }

  borrar(): void {

    this.dialog.open( ConfirmarComponent, {
      width: '250px'
    } );

    // this.heroeService.borrarHeroe( this.heroe.id! )
    //       .subscribe( resp => {
    //         this.router.navigate(['heroes']);
    //       })
  }

  mostrarSnackBar( mensaje: string ):void {
    this.snackBar.open( mensaje, 'Ok', {
      duration: 2500
    });
  }

}
