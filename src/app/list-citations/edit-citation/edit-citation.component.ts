import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitationService } from 'src/app/services/citation.service';
import { Citation } from 'src/app/_models/citation';

@Component({
  selector: 'app-edit-citation',
  templateUrl: './edit-citation.component.html',
  styleUrls: ['./edit-citation.component.scss']
})
export class EditCitationComponent implements OnInit {
citation: Citation;
editForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private citationService: CitationService,
    private formBuilder: FormBuilder) {
      this.editForm = this.formBuilder.group({
        content: ""
      })
    }

  ngOnInit(): void {

    // this.productService.getAllGames().subscribe((resp) => {
    //   this.games = resp;
    // });
    const idCitation = this.activatedRoute.snapshot.params['id'];
    this.citationService.selectOne(idCitation).subscribe((resp) => {
      console.log(resp)
      this.citation = resp[0];
    })
    // this.game = this.games.find(game => game.id == idGame);
    // const id = this.activatedRoute.snapshot.params.id;
   
  this.initForm();
  }

  initForm(): void{
    setTimeout(() => {
      this.editForm =  this.formBuilder.group({
        content: this.formBuilder.control('', [Validators.required])
       
      });
      this.editForm.setValue({
        content: this.citation.content
      });
    }, 1000)
    
  }

  onSubmit(): void{

  }

}