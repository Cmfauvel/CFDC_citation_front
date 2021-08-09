import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm?: FormGroup;
  
  constructor(
    //private auth: AuthService,
    private router : Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initConnexionForm();
  }

  initConnexionForm(): void {
    this.loginForm = this.fb.group({
      mail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      pseudo: this.fb.control('', [Validators.required])
    });
  }

  onSubmit() {
    const user = {
      email: this.loginForm.value.mail,
      username: this.loginForm.value.pseudo,
      password: this.loginForm.value.password,
    }
    console.log(user);
    // this.authService.login(user).subscribe(
    //   (resp: any) => {
    //     console.log("Connection succeed", resp);
    //     this.router.navigate(['/']);
    //   },
    //   error => {
    //     console.log('error while');
    //   }

    // )
  }
}
