import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token'
import { User } from '../models/User';
import { SessionStorageService } from './session-storage.service';
import { SessionInfo } from '../models/SessionInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService) { }

  login(email:string, password:string):Promise<SessionInfo> {
    let credentials = {email, password};
    return this.httpClient.post<SessionInfo>(`${this.baseUrl}/users/login`, credentials).toPromise<SessionInfo>();    
  }

  getUser(id:number): Promise<User> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    return this.httpClient
      .get<User>(`${this.baseUrl}/users/${id}`, {headers})
      .toPromise<User>();
  }

  logout(): Promise<any> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    console.log(headers);
    return this.httpClient
      .post<any>(`${this.baseUrl}/users/logout`, null, {headers})
      .toPromise<any>();
  }

  checkLogin(): Promise<any> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    console.log(headers);
    return this.httpClient
      .post<any>(`${this.baseUrl}/users/check-login`, null, {headers})
      .toPromise<any>();
  }

}
