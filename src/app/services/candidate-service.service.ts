import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Candidate } from '../models/Candidate';
import { SessionStorageService } from './session-storage.service';
import { SessionInfo } from '../models/SessionInfo';
import { PaginationResult } from '../models/PaginationResult';
@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {
  baseUrl:string = 'http://localhost:3000';
  constructor(private httpClient:HttpClient, private sessionStorageService:SessionStorageService) { }

  private getFormData(candidate:Candidate, files:File[]) {
    const keys = Object.keys(candidate);
    const formData = new FormData();
    keys.forEach(key => {
      formData.append(key, candidate[key]);
    });
    if (files) {
      for(let i = 0, c = files.length; i < c; i++) {
        formData.append('files[]', files[i]);
      }
    }
    return formData;
  }

  register(candidate:Candidate, files:File[]): Promise<Candidate> {
    const formData = this.getFormData(candidate, files);
    return this.httpClient.post<Candidate>(`${this.baseUrl}/candidates/register`, formData).toPromise<Candidate>();
  }

  get(country_id:number, param:string, page:number): Promise<PaginationResult> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    let params = new HttpParams();
    params = params.set('page', page.toString());
    if (country_id !== 0)
      params.set('country_id', country_id.toString());
    params = params.set('param', param);
    console.log(params);
    return this.httpClient
      .get<PaginationResult>(`${this.baseUrl}/candidates/`, { headers, params })
      .toPromise<PaginationResult>();
  }

  delete(id:number): Promise<any> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    return this.httpClient.delete(`${this.baseUrl}/candidates/${id}`, {headers}).toPromise();
  }

  findById(id:number): Promise<Candidate> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    return this.httpClient.get<Candidate>(`${this.baseUrl}/candidates/${id}`, {headers}).toPromise<Candidate>();
  }

  update(candidate: Candidate, files: File[]): Promise<Candidate> {
    const {accessToken} = this.sessionStorageService.getSessionInfo();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken.token}`
    });
    const formData = this.getFormData(candidate, files);
    return this.httpClient.patch<Candidate>(`${this.baseUrl}/candidates/${candidate.id}`, formData, {headers}).toPromise();
  }
  
  
}
