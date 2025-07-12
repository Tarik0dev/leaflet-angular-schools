// src/app/services/api.service.ts
import { Injectable } from '@angular/core';

export interface SchoolMarker {
  name: string;   // nom_etablissement
  lat: number;    // coord[0]
  lon: number;    // coord[1]
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly root =
    'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?limit=20';

  async listMarkersByCity(city: string, limit = 50): Promise<SchoolMarker[]> {
    const url =
      `${this.root}?dataset=fr-en-annuaire-education` +
      `&rows=${limit}` +
      `&refine.commune=${encodeURIComponent(city)}` +
      `&select=nom_etablissement,coord`;          // <-- coord, pas position

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erreur API : HTTP ${res.status}`);

    const { records } = await res.json();

    return records
      .filter((r: any) => r.fields.coord)
      .map((r: any) => ({
        name: r.fields.nom_etablissement,
        lat:  r.fields.coord[0],
        lon:  r.fields.coord[1]
      }));
  }
}
