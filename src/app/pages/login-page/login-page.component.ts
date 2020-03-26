import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';
import { SessionInfo } from 'src/app/models/SessionInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email:string;
  password:string;
  constructor(private router:Router, private userService:UserService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
  }

  async onSubmit(form) {
    try {
      const sessionInfo:SessionInfo = await this.userService.login(this.email, this.password);
      this.sessionStorageService.storeSessionInfo(sessionInfo);
      //TODO: navigate to admin home
      this.router.navigate(['admin']);
    } catch(ex) {
      console.log(ex);
    }
  }



}
