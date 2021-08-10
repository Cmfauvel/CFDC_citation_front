import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
currentUser: User;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((resp) => {
      this.currentUser = resp;
    })
  }

  logOut(): void {
    this.auth.logout();
  }

}
