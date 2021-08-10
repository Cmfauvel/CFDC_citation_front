import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
currentUser: User;
  constructor(
    private auth: AuthService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated();
    this.auth.currentUser.subscribe((resp) => {
      this.currentUser = resp;
    })
  }

  logOut(): void {
    this.auth.logout();
    this.route.navigate(['/'])
  }

}
