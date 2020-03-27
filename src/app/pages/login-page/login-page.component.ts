import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';
import { SessionInfo } from 'src/app/models/SessionInfo';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email:string;
  password:string;
  constructor(private authService:AuthService, private toastr:ToastrService, private router:Router, private userService:UserService, private sessionStorageService: SessionStorageService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().then(result => {
      if (result)
        this.router.navigate(['/admin/']);
    });
  }

  async onSubmit(form) {
    try {
      const sessionInfo:SessionInfo = await this.userService.login(this.email, this.password);
      this.sessionStorageService.storeSessionInfo(sessionInfo);
      this.router.navigate(['admin']);
    } catch(ex) {
      console.log(ex);
      this.toastr.error('Check if your login data and try again', 'Error');
    }
  }



}
