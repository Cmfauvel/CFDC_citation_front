import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../_models/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl = `${environment.apiUrl}`;
  messageActivate: string = "Veuillez cliquer sur le lien pour activer votre compte !";
  messageNotMatch: string = "Adresse mail ou mot de passe erroné."

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
          if (response.message == this.messageNotMatch) {
            return this.messageNotMatch;
          } else if (response.message == this.messageActivate) {
            return this.messageActivate;
          } else {
            this.currentUserSubject.next(response);
            this.router.navigateByUrl('/');
            localStorage.setItem('TOKEN_APPLI', response.token);
          }
        },
        (error) => {
          console.log('error trying to connect');
          // this.isAuth = false;}
        }
      );
  }

  getUserId() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    const id = parseInt(decodedToken.id);
    console.log(id)
    return id;
  }


  getToken() {
    const token = localStorage.getItem('TOKEN_APPLI')
    console.log(token)
    if (token) {
      return token;
    }
  }

  public isAuthenticated() {
    const token = this.getToken();
    const id = this.getUserId();
    if (token) {
      this.httpClient.get<any>(this.baseUrl + '/user/' + id).subscribe((resp) => {
        return this.currentUserSubject.next(resp);
      })
    }
  }

  isAuth(){
    const token = localStorage.getItem('TOKEN_APPLI');
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

  logout() {
    this.currentUserSubject.next(null)
    localStorage.removeItem('TOKEN_APPLI');
    this.router.navigate(['/connexion']);
  }

}

