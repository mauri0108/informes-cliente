import { Component, OnInit } from '@angular/core';
import { InformesService } from '../../services/informes.service';

import { Informe } from '../../models/informe';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {
  public _informes: Informe[] = [];

  constructor(private _informeService : InformesService) { }

  ngOnInit() {
    this._informeService.getInformes()
                        .subscribe( res =>  {
                          this._informes = res.informes;
                          //this.keys = Object.keys(this._informes);
                          console.log(res);
                        },
                        error =>{
                          console.log(error);
                        });
  }
}
