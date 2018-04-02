import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/service.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  
  public usuario: Usuario;
  
  constructor(public _usuarioService: UsuariosService) { }

  ngOnInit() {
    this._usuarioService.getUsuario( localStorage.getItem('id') )
                        .subscribe( res => {
                          this.usuario = res.usuario
                          //console.log( this.usuario );
                        },
                        error => {
                          
                        });
  }

}
