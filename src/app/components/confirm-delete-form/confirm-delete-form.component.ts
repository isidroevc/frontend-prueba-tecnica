import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirm-delete-form',
  templateUrl: './confirm-delete-form.component.html',
  styleUrls: ['./confirm-delete-form.component.scss']
})

export class ConfirmDeleteFormComponent implements OnInit {
  @Input() public message:string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal:NgbActiveModal) {

  }

  ngOnInit(): void {
  }

  confirm() {
    this.passEntry.emit(true);
    this.activeModal.close(true);
  }

  cancel() {
    this.passEntry.emit(false);
    this.activeModal.close(false);
  }

}
