import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtUtils } from '../utils/jwt.utils';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly BASE_URL = environment.baseUrl;
  readonly TODO_URL = '/todo/all';
  readonly ADD_TODO_URL = '/todo/update';

  constructor(
    private jwtUtils: JwtUtils,
    private http: HttpClient
  ) { }

  getAllTodos(): Observable<any> {
    let token = this.jwtUtils.getUserToken();
    console.log("token che metto nell'header come auth-token: " + token);
    let options = {
      headers: new HttpHeaders().set('auth-token', token),
    };
    let resp = this.http.get(this.BASE_URL + this.TODO_URL, options);
    return resp;
  }

  addTodo(todo: Note) {
    let token = this.jwtUtils.getUserToken();
    let options = {
      headers: new HttpHeaders().set('auth-token', token).set("content-type", "application/json"),
    };
    let resp = this.http.post(this.BASE_URL + this.ADD_TODO_URL, todo, options);
    return resp;
  }

  deleteTodo(id: number) {
    let token = this.jwtUtils.getUserToken();
    let options = {
      headers: new HttpHeaders()
      .set('auth-token', token)
      .set("content-type", "application/json"),
    };
    let resp = this.http.delete(this.BASE_URL + "/todo/" + id + "/delete", options);
    // console.log("URL DELETE [" + this.BASE_URL + "/todo/" + id + "/delete]");
    return resp;
  }
}
