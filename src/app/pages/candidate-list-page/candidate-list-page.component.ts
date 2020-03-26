import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/Candidate';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import { PaginationResult } from 'src/app/models/PaginationResult';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteFormComponent } from 'src/app/components/confirm-delete-form/confirm-delete-form.component';

@Component({
  selector: 'app-candidate-list-page',
  templateUrl: './candidate-list-page.component.html',
  styleUrls: ['./candidate-list-page.component.scss']
})
export class CandidateListPageComponent implements OnInit {
  countries:Country[]
  param:string = '';
  candidates:Candidate[];
  page:number = 1;
  lastPage:number = 1;
  country_id:number = 0;
  total:number;
  constructor(public modalService: NgbModal, private countryService:CountryService, private router:Router, private candidateService:CandidateServiceService) { }

  ngOnInit(): void {
    this.loadData().then();
    this.countryService.get().then(countries => {
      this.countries = countries;
    });
  }

  async onSubmit(form) {
    this.page = 1;
    await this.loadData();
  }

  async loadData() {
    try {
      console.log(this.param);
      const paginationResult:PaginationResult 
        = await this.candidateService.get(this.country_id, this.param, this.page);
      this.candidates = paginationResult.data;
      this.lastPage = paginationResult.lastPage;
      this.total = paginationResult.total;
    } catch(ex) {
      alert('An error was ocurred while loading data!');
    }    
  }

  async goToLastPage() {
    this.page = this.lastPage;
    await this.loadData();
  }

  async goToFirstPage() {
    this.page = 1;
    await this.loadData();
  }

  async goOnePageForward() {
    console.log('here');
    if (this.page < this.lastPage) {
      this.page = this.page + 1;
      await this.loadData();
    }
  }

  async goOnePageBack() {
    if (this.page > 1) {
      this.page = this.page - 1;
      await this.loadData();
    }

  }

  navigateToDelete(id) {
    this.router.navigate([`/admmin/candidates/${id}/delete`]);
  }

  navigateToEdit(id) {
    this.router.navigate([`/admmin/candidates/${id}/edit`]);
  }

  async openDeleteModal(candidate:Candidate) {
    const modalRef = this.modalService.open(ConfirmDeleteFormComponent);
    modalRef.componentInstance.message = `Are you sure you want to delete "${candidate.name} ${candidate.last_name}" info?`;
    const result = await modalRef.result;
    try {
      if (result) {
        await this.candidateService.delete(candidate.id);
        await this.loadData();
      }
      alert('Data deleted succesfully');
    } catch(ex) {
      alert('Could not perform operation');
    }
  }

}
