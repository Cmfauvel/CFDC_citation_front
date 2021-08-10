import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CitationService } from '../services/citation.service';
import { Citation } from '../_models/citation';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
citation: Citation;
citationSub: Subscription;
currentUser: User;
  constructor(private citationService: CitationService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((resp) => {
      this.currentUser = resp;
    })
    try {
      this.displayCitation();
    } catch(error) {
      console.log("__Error handled gracefully : ", error.name)
    }
   
  }

  displayCitation() {
    this.citationSub = this.citationService.selectOneRandom().subscribe((resp) => {
    this.citation = resp;    
    })
  }

  ngOnDestroy(): void {
    this.citationSub.unsubscribe();
  }

}
