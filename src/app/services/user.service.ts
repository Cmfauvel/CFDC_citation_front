import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${environment.apiUrl}/user/`;
  constructor(private http: HttpClient) { }

  selectById(id): Observable<any>{
    return this.http.get<User>(this.baseUrl + id)
  }
}
