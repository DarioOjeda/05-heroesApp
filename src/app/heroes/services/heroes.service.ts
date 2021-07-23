import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;
  

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
  }

  getHeroePorId( id: string):Observable<Heroe> {
    const url = `${this.baseUrl}/heroes/${ id }`;

    return this.http.get<Heroe>( url );
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>( `${this.baseUrl}/heroes?q=${ termino }&_limit=5`);
  }

  agregarHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>( `${ this.baseUrl }/heroes`, heroe);

  }

  actualizarHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>( `${ this.baseUrl }/heroes/${ heroe.id }`, heroe);

  }

  borrarHeroe( id: String): Observable<any> {
    return this.http.delete<any>( `${ this.baseUrl }/heroes/${ id }`);

  }
  
}
