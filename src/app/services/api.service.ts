import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Results, SchoolsResult } from '../models/interfaceSchool';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?where=';
  constructor(private http: HttpClient) { }

  getEtablissement(searchArea: number[][][]): Observable<SchoolsResult> {
    const geoJson = {
      type: "Polygon",
      coordinates: searchArea,
    };
    const locationParameter = `intersects(position, geom'${JSON.stringify(geoJson)}')`;
    const locationParameterEncoded = encodeURIComponent(locationParameter);

    return this.http.get<SchoolsResult>(this.apiUrl + locationParameterEncoded);
  }

  getEtablissementById(id: string): Observable<SchoolsResult> {
    const searchParameter = `search(identifiant_de_l_etablissement, "${id}")`;
    return this.http.get<SchoolsResult>(this.apiUrl + searchParameter + "&limit=1");
  }
}
