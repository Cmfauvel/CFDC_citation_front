import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private route: Router) { 
      // this.registerForm = new FormGroup({});
    }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      pseudo: this.fb.control('', [Validators.required]),
      mail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ])
    });
  }

  onSubmit(){
    console.log(this.registerForm.value)
    const user = {
      username: this.registerForm.value.pseudo,
      mail: this.registerForm.value.mail,
      password: this.registerForm.value.password
    }
    console.log(user)

    this.auth.register(user).subscribe((response) => console.log(response));
    this.route.navigate(['/connexion']);
  }

  

}
