import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  
  formChangePass: FormGroup;
  token: string;
  constructor( 
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuariosService ) { }


  ngOnInit() {
    document.body.style.backgroundImage = "url('assets/img/login-background.jpeg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";

    this._activatedRoute.queryParams.subscribe(params => {
      console.log(params['token']);
      this.token = params['token']
  });

    this.formChangePass = new FormGroup({
      pass: new FormControl( null, Validators.required ),
      pass2: new FormControl( null,  Validators.required )
    }, this.passwordMatchValidator );

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('pass').value === g.get('pass2').value
       ? null : {'mismatch': true};
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }
  
  changePass() {
    if (this.formChangePass.invalid) {
      return
    }

    if (this.token) {
      //console.log(this.formChangePass.value.pass);
      this._usuarioService.changePassToken(this.formChangePass.value.pass, this.token)
                          .subscribe( res => {
                            swal('Perfecto!', res.message , 'success');
                            this._router.navigate(['/login']);
                          },
                          error => {
                            swal('Error!',  error.error.message , 'error');
                          });
    }else {
      swal('Error en la ruta', 'No esta usando un token en la barra de direcciones' , 'error');
    }


    console.log( this.formChangePass.value )
  }
}
