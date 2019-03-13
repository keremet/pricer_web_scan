import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
  styleUrls: ['./index-view.component.less']
})
export class IndexViewComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(!this.auth.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    
    this.router.navigate(['scan']);
  }

}
