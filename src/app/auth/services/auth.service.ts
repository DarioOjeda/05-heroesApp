import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor( private httpClient: HttpClient) { }

  login() {
    return this.httpClient.get<Auth>(`${ this.baseUrl }/usuarios/1`)
                    .pipe(
                      tap( auth => this._auth = auth)
                    );
  }

  logout() {
    this._auth = undefined;
  }
}
