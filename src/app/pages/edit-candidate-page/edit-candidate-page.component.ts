import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/Candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteFormComponent } from 'src/app/components/confirm-delete-form/confirm-delete-form.component';
import { Attachment } from 'src/app/models/Attachment';

@Component({
  selector: 'app-edit-candidate-page',
  templateUrl: './edit-candidate-page.component.html',
  styleUrls: ['./edit-candidate-page.component.scss']
})
export class EditCandidatePageComponent implements OnInit {
  candidate:Candidate = new Candidate();
  constructor(private modalService: NgbModal, private toastr:ToastrService, private activatedRoute:ActivatedRoute, private candidateService:CandidateServiceService) { }

  ngOnInit(): void {
    this.candidateService.findById(this.activatedRoute.snapshot.params.id)
      .then(candidate => {
        this.candidate = candidate;
      }).catch(ex => {
        this.toastr.error('Error loading data', 'Error');
      });
  }

  async openDeleteModal(attachment:Attachment) {
    const modalRef = this.modalService.open(ConfirmDeleteFormComponent);
    modalRef.componentInstance.message = `Are you sure you want to delete "${attachment.filename}"?`;
    const result = await modalRef.result;
    try {
      if (result) {
        await this.candidateService.deleteAttachments(attachment.candidate_id, attachment.id);
        this.candidate = await this.candidateService.findById(attachment.candidate_id);
        this.toastr.success('Data deleted successfully!', 'Success');
      }
      
    } catch(ex) {
      this.toastr.success('Error deleting data', 'Error');
    }
  }

  async download(attachment:Attachment) {
    try {
      const response = await this.candidateService.downloadAttachment(attachment.id);
      console.log(response);
      const blob = new Blob([response], {type: attachment.mime_type});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch(ex) {
      console.log(ex);
      this.toastr.error('Could not download file');
    }
  }

  onDataChanged(event:Candidate) {
    this.candidate = event;
  }

}
