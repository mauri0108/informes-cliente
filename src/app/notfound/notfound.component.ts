import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    document.body.style.fontFamily = "'Helvetica Neue',Arial,Helvetica, Verdana, sans-serif;";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundImage = "url('assets/img/not-found-background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";
    document.body.style.minHeight = "100%";
    document.documentElement.style.minHeight = "100%";
    document.body.style.margin = "0";
    document.body.style.margin = "0";
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }

}
