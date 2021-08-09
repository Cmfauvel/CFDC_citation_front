import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { decode } from 'jwt-decode';
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

  login(body) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/login', body)
    // .subscribe(
    //   (response) => {
    //     this.currentUserSubject.next(response);
    //     this.router.navigateByUrl('/');
    //     localStorage.setItem('TOKEN_APPLI', response.accessToken);
    //     },
    //   (error) => {
    //     console.log('error trying to connect');
    //     // this.isAuth = false;}
    //   }
    // );
      .pipe(
        map(
          (resp: any) => {
            this.currentUserSubject.next(resp);
            localStorage.setItem('TOKEN_APPLI', resp.accessToken);
            console.log('Token Save', resp.accessToken);
            return resp;
          }
        )
      );
  }

//   getUserId(){
// const helper = new JwtHelperService();
// const decodedToken = helper.decodeToken(this.getToken());
// const id = parseInt(decodedToken.sub);
// return id;
//   }

  register(user): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/auth/register', user)
  }

  // getToken(){
  //   const token =localStorage.getItem('TOKEN_APPLI')
  //   console.log(token)
  //   if(token){
  //     return token;
  //   }
  // }

  // public isAuthenticated() {
  //   const token = this.getToken();
  //   const id = this.getUserId();
  //   if(token) {
  //     return this.httpClient.get<any>(this.baseUrl + '/users/' + id).subscribe((resp) => {
  //       this.currentUserSubject.next(resp);
  //     })
  //   }
  // }

  logout() {
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/login']);
  }

}

