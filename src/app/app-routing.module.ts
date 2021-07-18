import { NgModule } from '@angular/core';
import { Routes } from "@angular/router";
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent,
  }
]

@NgModule({
  imports: [
    
  ]
})
export class AppRoutingModule { }
