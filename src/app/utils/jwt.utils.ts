import * as jwt_decode from 'jwt-decode';
import { TOKEN } from '../app.constant';
import { JwtUser } from './../model/jwt-user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtUtils {
  getUserToken(): string {
    let token = localStorage.getItem(TOKEN);
    return token;
  }

  getUserDataFromToken(): JwtUser {
    let token = this.getUserToken();
    let decoded = jwt_decode(token);
    return decoded as JwtUser;
  }
}