import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import { HttpErrorResponse } from '@angular/common/http';
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
    if (this.action === 'register') {
      await this.saveNewCandidate()
    } else if (this.action === 'update'){
    
    }
    console.log('candidate: ', this.candidate);
  }

  getFiles(event) {
    if (!this.validateFiles(event.target.files)) {
      alert(`Only jpg, png and pdf files are allowed`);
      event.target.value = null;
    } else {
      this.files = event.target.files;
    }
  }

  private validateFiles(files:File[]) : boolean{
    const validExtensions:string[] = [
      'jpg',
      'png',
      'pdf'
    ];
    for(let i = 0, c = files.length; i < c; i++) {
      if (!validExtensions.includes(this.getFileExtension(files[0].name.toLocaleLowerCase())))
        return false;
    }
    return true;
  }

  private getFileExtension(filename) {
    let extension:string;
    let parts:string = filename.split('.');
    if (parts.length) {
      return '';
    }
    extension = parts[parts.length - 1];
    return extension;
  }

  private async saveNewCandidate() {
    try {
      this.candidate = await this.candidateService.register(this.candidate, this.files);
    } catch(ex) {
      alert('There was a problem while saving your data, please try again later.')
    }
  }

}
