import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/Candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-candidate-page',
  templateUrl: './edit-candidate-page.component.html',
  styleUrls: ['./edit-candidate-page.component.scss']
})
export class EditCandidatePageComponent implements OnInit {
  candidate:Candidate = new Candidate();
  constructor(private toastr:ToastrService, private activatedRoute:ActivatedRoute, private candidateService:CandidateServiceService) { }

  ngOnInit(): void {
    this.candidateService.findById(this.activatedRoute.snapshot.params.id)
      .then(candidate => {
        this.candidate = candidate;
      }).catch(ex => {
        this.toastr.error('Error loading data', 'Error');
      });
  }

}
