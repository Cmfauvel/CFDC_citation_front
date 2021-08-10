import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'generateurCitations';
currentUser: User;
  constructor(private auth: AuthService){
    // this.auth.currentUser.subscribe((resp) => {
    //   console.log(resp)
    // })
  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.auth.isAuthenticated();
  
}
  
}
