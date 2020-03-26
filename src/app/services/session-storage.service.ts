import { Injectable } from '@angular/core';
import { Token } from '../models/Token';
import { User } from '../models/User';
import { SessionInfo } from '../models/SessionInfo';
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() { }

  storeSessionInfo(sessionInfo: SessionInfo) {
    sessionStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
  }

  clearSessionInfo() {
    sessionStorage.removeItem('sessionInfo');
  }

  getSessionInfo(): SessionInfo {
    return JSON.parse(sessionStorage.getItem('sessionInfo'));
  }
}
