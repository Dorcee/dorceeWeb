import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor( private router:Router ) { }

  ngOnInit() {
  	$(document).foundation();
  }

  footerNavigationToMyAccount(){
  	window.scroll(0,0);
  }
}