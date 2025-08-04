import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SchoolsResult } from '../models/interfaceSchool';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=100';
  constructor(private http: HttpClient) { }

  getEtablissement(): Observable<SchoolsResult> {
    return this.http.get<SchoolsResult>(this.apiUrl);
  }
}
