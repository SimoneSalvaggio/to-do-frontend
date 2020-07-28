import { Injectable } from '@angular/core';
import { JwtUtils } from '../utils/jwt.utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  readonly BASE_URL = environment.baseUrl;
  readonly TAG_URL = '/tag/all';

  constructor(
    private jwtUtils: JwtUtils,
    private http: HttpClient,
  ) { }

  getAllTags(): Observable<any> {
    let token = this.jwtUtils.getUserToken();
    let options = {
      headers: new HttpHeaders().set('auth-token', token),
    };
    let resp = this.http.get(this.BASE_URL + this.TAG_URL, options);
    return resp;
  }
}
