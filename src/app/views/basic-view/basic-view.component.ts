import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { HeaderComponent } from 'src/app/controls/header/header.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-basic-view',
  templateUrl: './basic-view.component.html',
  styleUrls: ['./basic-view.component.less']
})
export class BasicViewComponent implements OnInit {

  @ViewChild('header')
  header: HeaderComponent;

  constructor(private location: Location, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe( (e: Event) => {

      if (e instanceof NavigationEnd) {
        let child = this.route.firstChild;
        if(child) {
          let data = child.snapshot.data;
          this.header.title = data.title ? data.title : '';
          this.header.back = data.backArrow ? data.backArrow : false;
        }
      }

    } );
  }

  ngOnInit() {
  }

  headerBackClicked() {
    this.location.back();
  }

}
