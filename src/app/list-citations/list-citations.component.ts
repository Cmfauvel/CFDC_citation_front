import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Citation } from '../_models/citation';
import { User } from '../_models/user';

@Component({
  selector: 'app-list-citations',
  templateUrl: './list-citations.component.html',
  styleUrls: ['./list-citations.component.scss']
})
export class ListCitationsComponent implements OnInit {
citations: Citation[];
currentUser: User;
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((resp) => {
      this.currentUser = resp;
    })
    this.findCitations();
  }

  findCitations(){
    setTimeout(() => {
      this.userService.selectById(this.currentUser.id).subscribe((resp) => {
        this.citations = resp[0].citations;
        console.log(resp)
      })
    }, 1000)
  }

}
