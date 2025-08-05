
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';
import { SchoolsResult } from '../../models/interfaceSchool';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  private map: L.Map | undefined;
  apiResult: SchoolsResult['results'] = [];
  schoolMarkers: L.Marker[] = [];
   // Tableau des écoles

  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map!);

    this.map.locate({ setView: true, maxZoom: 13 });

    this.map.on('locationfound', (e: L.LocationEvent) => {
      L.marker(e.latlng)
        .addTo(this.map!)
        .bindPopup('Vous êtes ici!')
        .openPopup();
      console.log('Position :', e.latlng.lat, e.latlng.lng);
    });

    this.map.on('moveend', () =>{


      if(this.map) {
          const bounds = this.map?.getBounds();
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();
          const searchArea = [[
            [sw.lng, sw.lat],
            [ne.lng, sw.lat],
            [ne.lng, ne.lat],
            [sw.lng, ne.lat],
            [sw.lng, sw.lat]
          ]];

          this.loadSchools(searchArea);
      }
    })

  }

  loadSchools(searchArea: number[][][]) {
    this.cleanMarkers();
    this.api.getEtablissement(searchArea).subscribe(data => {
      this.apiResult = data.results;
      this.apiResult.forEach(res => {
        const marker = L.marker([res.position.lat, res.position.lon])
          .addTo(this.map!)
          .bindPopup(`École : ${res.nom_etablissement}`);
        this.schoolMarkers.push(marker);
      });
    });
  }

  cleanMarkers() {
    this.schoolMarkers.forEach((schoolMarker) => {
      this.map?.removeLayer(schoolMarker);
    })

    this.schoolMarkers = [];
  }
}
