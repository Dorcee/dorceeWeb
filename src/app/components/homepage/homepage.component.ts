import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$(document).foundation();

  	$('.homePageSlick').not('.slick-initialized').slick({
	    infinite: true,
	    autoplay: true,
	    autoplaySpeed: 2000,
	    arrows: false
	  });
	  
	  $('.productImageSlideContainer').not('.slick-initialized').slick({
	    infinite: false,
	  });
	  
  }

}
