import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm?: FormGroup;
  
  constructor(
    private auth: AuthService,
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
      ])
    });
  }

  onSubmit() {
    const user = {
      mail: this.loginForm.value.mail,
      password: this.loginForm.value.password,
    }
    console.log(user);
    this.auth.login(user).subscribe(
      (resp: any) => {
        console.log("Connection succeed", resp);
        this.router.navigate(['/']);
      },
      error => {
        console.log('error while');
      }

    )
  }
}
