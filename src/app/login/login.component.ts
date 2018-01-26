import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
   public email: string;
   public recuerdame = false;

  constructor(
    public _router: Router,
    public _usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }

    document.body.style.backgroundImage = "url('https://www.abogadivorcio.com/i/wi/informes-medicos-para-solicitar-la-custodia-compartidad.1280x960.1494612128.jpeg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }

  ingresar( forma: NgForm) {

    if ( forma.invalid) {
      return;
    }

    let usuario = new Usuario( null, null, null, forma.value.email, forma.value.pass, null, null, null);

    this._usuarioService.login( usuario, forma.value.recuerdame)
                        .subscribe( res => this._router.navigate( ['inicio'] ) );
    //console.log(forma.valid);
    //console.log(forma.value);
    
  }

}
