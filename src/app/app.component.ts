import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'pricer-web';

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.initialize();
    ///
  }
}
