import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtUtils } from 'src/app/utils/jwt.utils';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginFailed: boolean;

  constructor(
    private loginService: LoginService,
    private jwtUtils: JwtUtils,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginFailed = false;
  }

  login() {
    this.loginFailed = false;
    let promise = this.loginService.login(this.username, this.password);
    promise.then((success) => {
      console.log('login effettuato: ' + success);
      if (success) {
        console.log("Username: " + this.username + " - Password: " + this.password);
        this.router.navigate(['home'],{skipLocationChange: true,});
      } else {
        this.loginFailed = true;
      }
    });
  }

}
