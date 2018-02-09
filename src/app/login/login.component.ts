import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario';
import { _throw } from 'rxjs/observable/throw';

//import swal from 'sweetalert';
declare var swal: any;
declare var $: any;

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

    document.body.style.backgroundImage = "url('assets/img/login-background.jpeg')";
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

    let usuario = new Usuario( null, null, null, forma.value.email, null, forma.value.pass, null, null, null );
    console.log(usuario);

    this._usuarioService.login( usuario, forma.value.recuerdame)
                        .subscribe( res => this._router.navigate( ['inicio'] ) );
    //console.log(forma.valid);
    //console.log(forma.value);
    
  }


  sendEmail( forma: NgForm) {
    if ( forma.invalid) {
      return;
    }

    this._usuarioService.sendEmailReset(forma.value.emailReset)
                        .subscribe( res  => {
                          
                          swal('Perfecto!', res.message , 'success');
                          $('#modalPass').modal('hide');
                        },
                        error => {
                          
                          console.log( error )
                          swal('Error al enviar email', error.error.message, 'error');
                          $('#modalPass').modal('hide');
                          //console.log( err.error.message )
                        });
  }

}
