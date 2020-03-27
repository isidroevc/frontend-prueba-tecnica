import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService, private sessionStorageService: SessionStorageService) { }

  async isAuthenticated() {
    const sessionInfo = this.sessionStorageService.getSessionInfo();
    
    if (sessionInfo !== null) {
      const {logged} = await this.userService.checkLogin();
      return logged;
    }
    return false;
  }
}
