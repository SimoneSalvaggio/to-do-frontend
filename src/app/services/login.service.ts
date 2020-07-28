import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { TOKEN } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly BASE_URL = environment.baseUrl;
  readonly AUTH_URL = '/user/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<boolean>  {
    let loginPromise = new Promise<boolean>((resolve) => {
      let httpParams = new HttpParams()
        .set('username', username)
        .set('password', password);
      let obs = this.http.post(this.BASE_URL + this.AUTH_URL, null, {
        params: httpParams,
        responseType: 'text',
      });

      obs.subscribe(
        (data) => {
          if (!data) {
            resolve(false);
          } else {
            console.log("Token: " + data);
            localStorage.setItem(TOKEN, data);
            resolve(true);
          }
        },
        (error) => {
          console.log('Errore chiamata: ' + error);
          resolve(false);
        }
      );
    });
    return loginPromise;
  }

}
