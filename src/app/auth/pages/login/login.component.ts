import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  constructor( private router: Router,
               private authService: AuthService ) { }

  login() {
    // Ir al backend
    // un usaurio
    this.authService.login().subscribe( resp => {
      console.log(resp);

      if(resp.id) {
        this.router.navigate(['./heroes'])
      }
    });
    // this.router.navigate(['./heroes'])

  }

  sinLogin() {
    this.authService.logout();
    this.router.navigate(['./heroes']);
    // esto pone a prueba que el can load solo
    // comprueba que se pueda cargar el modulo, si ya esta cargado(lazyLoad)
    // el authguard no te echa patras aunque la instancia de auth sea undefined
  }

}
