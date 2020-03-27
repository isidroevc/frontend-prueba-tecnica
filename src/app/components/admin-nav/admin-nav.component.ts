import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteFormComponent } from '../confirm-delete-form/confirm-delete-form.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  constructor(private sessionStorage:SessionStorageService, private router:Router, private userService:UserService, private toastr:ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  async logout() {
    const modalRef = this.modalService.open(ConfirmDeleteFormComponent);
    modalRef.componentInstance.message = `Are you sure you want to logout?`;
    const result = await modalRef.result;
    try {
      if (result) {
        await this.userService.logout();
        this.sessionStorage.clearSessionInfo();
        this.router.navigate(['/admin/login']);
      }
    } catch(ex) {
      this.toastr.error('Error logging out', 'Error');
    }
  }

}
