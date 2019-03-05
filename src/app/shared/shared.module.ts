//Core
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Components
import { NavbarComponent } from './navbar/navbar.component';
import { ModalInstitucionComponent } from '../components/modal-institucion/modal-institucion.component'
import { PipesModule } from 'app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule
  ],
  declarations: [
    NavbarComponent,
    ModalInstitucionComponent
  ],
  exports: [
    NavbarComponent,
    ModalInstitucionComponent
  ]
})

export class SharedModule { }