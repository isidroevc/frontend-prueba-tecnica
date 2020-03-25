import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Candidate } from '../models/Candidate';
@Injectable({
  providedIn: 'root'
})
export class CandidateServiceService {
  baseUrl:string = 'http://localhost:3000';
  constructor(private httpClient:HttpClient) { }

  private getFormData(candidate:Candidate, files:File[]) {
    const keys = Object.keys(candidate);
    const formData = new FormData();
    keys.forEach(key => {
      formData.append(key, candidate[key]);
    });
    console.log(files);
    for(let i = 0, c = files.length; i < c; i++) {
      formData.append('files[]', files[i]);
    }
    return formData;
  }

  register(candidate:Candidate, files:File[]): Promise<Candidate> {
    const formData = this.getFormData(candidate, files);
    return this.httpClient.post<Candidate>(`${this.baseUrl}/candidates/register`, formData).toPromise<Candidate>();
  }
  
  
}
