import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(newUser: User) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/register', newUser).pipe(map((response) => {
        return response;
      })
    );
  }

  login(body) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/login', body)
      .subscribe(
        (response) => {
          console.log(response)
          this.currentUserSubject.next(response);
          this.router.navigateByUrl('/');
          localStorage.setItem('TOKEN_APPLI', response.token);
        },
        (error) => {
          console.log('error trying to connect');
          // this.isAuth = false;}
        }
      );
  }

  public isAuthenticated() {
    const token = localStorage.getItem('TOKEN_APPLI');
    console.log(token)
    return this.httpClient
      .get<any>(`${this.baseUrl}/auth/check-authentication/${token}`)
      .subscribe(
        (response) => {
          console.log(response)
          this.currentUserSubject.next(response);
        },
        (error) => {
          console.log('error trying to connect');
        }
      );
  }


  // register(user): Observable<User> {
  //   return this.httpClient.post<User>(this.baseUrl + '/auth/register', user)
  // }


  // logout() {
  //   localStorage.removeItem('TOKEN_APPLI');
  //   this.router.navigate(['/login']);
  // }

}

