import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Candidate } from '../../models/Candidate';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  @Input() candidate:Candidate = new Candidate();
  @Input() action:string;
  @Output() dataChanged:EventEmitter<Candidate> = new EventEmitter();
  @ViewChild('filesInput') filesInput: ElementRef;
  countries:Country[];
  constructor(private countryService:CountryService, private router:Router, private toastr:ToastrService,  private candidateService: CandidateServiceService) {
    
  }
  private files: File[];
  ngOnInit(): void {
    this.countryService.get().then(
      countries => this.countries = countries
    );
    
  }

   async onSubmit(form) {
    if (this.action === 'register') {
      await this.saveNewCandidate()
    } else if (this.action === 'edit'){
      await this.updateCandidate();
    }
    console.log('candidate: ', this.candidate);
  }

  getFiles(event) {
    if (!this.validateFiles(event.target.files)) {
      this.toastr.warning(`Only jpg, png and pdf files are allowed`, 'Bad file formats provided');
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
      const extension = this.getFileExtension(files[0].name.toLocaleLowerCase());
      console.log('ext', extension);
      if (!validExtensions.includes(extension))
        return false;
    }
    return true;
  }

  private getFileExtension(filename) {
    let extension:string;
    let parts:string = filename.split('.');
    if (parts.length === 0) {
      return '';
    }
    extension = parts[parts.length - 1];
    return extension;
  }

  private async saveNewCandidate() {
    try {
      this.candidate = await this.candidateService.register(this.candidate, this.files);
      this.toastr.success('Your information has been stored successfully!', 'Success');
      window.location.reload();
    } catch(ex) {
      this.toastr.error('There was a problem while saving your data, please try again later.', 'Error');
    }
  }

  private async updateCandidate() {
    try {
      this.candidate = await this.candidateService.update(this.candidate, this.files);
      this.dataChanged.emit(this.candidate);
      this.files = [];
      this.filesInput.nativeElement.value = '';
      this.toastr.success('Data updated successfully!', 'Success');
    } catch(ex) {
      console.log(ex);
      this.toastr.error('There was a problem while saving your data, please try again later.', 'Error');
    }
    
  }

}
