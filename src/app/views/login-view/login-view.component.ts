import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.less']
})
export class LoginViewComponent implements OnInit {

  login: string;
  password: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    if(this.auth.loggedIn)
      this.router.navigateByUrl('/');
  }

  loginClicked() {

    this.auth.login(this.login, this.password).then(ok => {
      if(!ok) {
        alert('Ошибка авторизации');
        return;
      }

      this.router.navigateByUrl('/');
    });

  }

}
