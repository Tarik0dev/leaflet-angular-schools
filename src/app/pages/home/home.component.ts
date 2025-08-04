
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';
import { SchoolsResult } from '../../models/interfaceSchool';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  private map: L.Map | undefined;
  schools: SchoolsResult['results'] = []; // Tableau des écoles

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


    this.api.getEtablissement().subscribe(data => {
      this.schools = data.results;
      this.schools.forEach(school => {
        L.marker([school.position.lat, school.position.lon])
          .addTo(this.map!)
          .bindPopup(`École : ${school.nom_etablissement}`);
      });
    });
  }
}import { Component, AfterViewInit } from '@angular/core';
