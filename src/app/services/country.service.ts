import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl:string = 'http://localhost:3000'
  constructor(private httpClient:HttpClient) { }

  get(): Promise<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseUrl}/countries/`).toPromise<Country[]>();
  }
}
