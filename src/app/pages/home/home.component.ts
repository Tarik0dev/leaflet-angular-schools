import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService, SchoolMarker } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl:   './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(private api: ApiService) {}

  async ngAfterViewInit() {

    /* 1. Carte toujours visible */
    const map = L.map('mapDisplay').setView([46.6, 2.4], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                { attribution: '© OpenStreetMap contributors' }).addTo(map);

    try {
      /* 2. Charge les marqueurs */
      const markers: SchoolMarker[] = await this.api.listMarkersByCity('Nice');

      if (markers.length) {
        map.setView([markers[0].lat, markers[0].lon], 12);
      }

      /* 3. Ajoute les points */
      markers.forEach(m =>
        L.marker([m.lat, m.lon]).addTo(map).bindPopup(m.name)
      );

    } catch (err) {
      console.error(err);
      L.popup()
        .setLatLng(map.getCenter())
        .setContent('⚠️ Données API indisponibles')
        .openOn(map);
    }
  }
}
