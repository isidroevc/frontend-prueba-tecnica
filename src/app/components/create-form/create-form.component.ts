import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  candidate:Candidate = new Candidate();
  action:string;

  constructor(private candidateService: CandidateServiceService) {
    
   }
  private files: File[];
  ngOnInit(): void {
  }

   async onSubmit(form) {
    this.candidate = await this.candidateService.register(this.candidate, this.files);
    console.log('candidate: ', this.candidate);
  }

  getFiles(event) {
    this.files = event.target.files;
    console.log(this.files);
  }

}
