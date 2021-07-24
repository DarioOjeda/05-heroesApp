import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    //Esto dice: cuando alguien entra al path auth
    //carga sus hijos, y esos hijos, van a venir del producto del auth module, 
    //cuando eso cargue en memoria(el resultado de la promesa del import), entonces
    //el modulo que se va a cargar es el auth module.
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent,

    redirectTo: '404',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
