import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionStorageService: SessionStorageService) { }

  isAuthenticated(): boolean {
    return this.sessionStorageService.getSessionInfo() !== null;
  }
}
