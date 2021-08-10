import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CitationService } from 'src/app/services/citation.service';
import { Citation } from 'src/app/_models/citation';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-upload-citation',
  templateUrl: './upload-citation.component.html',
  styleUrls: ['./upload-citation.component.scss']
})
export class UploadCitationComponent implements OnInit {
  citation: Citation;
  uploadForm: FormGroup;
  currentUser: User;
    constructor(private activatedRoute: ActivatedRoute,
      private citationService: CitationService,
      private formBuilder: FormBuilder,
      private auth: AuthService,
      private route: Router) {
        this.uploadForm = this.formBuilder.group({
          content: ""
        })
      }

  ngOnInit(): void {
    this.initForm();
    this.auth.currentUser.subscribe((resp) => {
      this.currentUser = resp;
    })
  }

  initForm(): void{
    setTimeout(() => {
      this.uploadForm =  this.formBuilder.group({
        content: this.formBuilder.control('', [Validators.required])
       
      });
    }, 1000)
    
  }

  onSubmit(): void {
    this.citationService.create(this.currentUser.id, this.uploadForm.value).subscribe((resp) => {
      console.log(resp)
      this.route.navigate(['/citations']);
    })
  }

}
