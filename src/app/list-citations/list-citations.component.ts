import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CitationService } from '../services/citation.service';
import { UserService } from '../services/user.service';
import { ConfirmComponent } from '../_helpers/confirm/confirm.component';
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
  constructor(private auth: AuthService, private userService: UserService, private citationService: CitationService, private matDialog: MatDialog) { }

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

  deleteCitation(id: number): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '350px',
      data: "Voulez-vous supprimer cette Citation ?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.citationService.delete(id).subscribe((resp) => {
          this.citationService.selectAll();
        });
      };
    });
  };

}
