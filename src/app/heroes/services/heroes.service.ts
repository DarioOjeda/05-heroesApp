import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiUrl: string = 'http://localhost:3000/heroes';
  

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('http://localhost:3000/heroes')
  }

  getHeroePorId( id: string):Observable<Heroe> {
    const url = `http://localhost:3000/heroes/${ id }`;

    return this.http.get<Heroe>( url );
  }
  
}
