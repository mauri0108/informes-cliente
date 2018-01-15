import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  public _usuarios: Usuario[];

  constructor( private _usuarioService: UsuariosService) { }

  ngOnInit() {
    this._usuarioService.getUsuarios()
                        .subscribe( res => {
                             this._usuarios = res.usuarios; 
                             console.log(this._usuarios)
                            },
                          error => {
                             console.log(error);
                          }

    );
  }
}
