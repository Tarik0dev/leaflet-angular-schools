import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Results } from '../../models/interfaceSchool';

@Component({
  selector: 'app-contact',
  imports: [RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  name: string = '';
  fname: string = '';
  mail: string = '';
  message: string = '';
  object: string = '';
  school?: Results;
  conditionsAccepted: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      const id = param?.['id'];
      if (id) {
        this.apiService.getEtablissementById(id).subscribe({
          next: (result) => {
            if (result.results[0]) {
              this.school = result.results[0];
            } else {
              this.router.navigate(['/'])
            }
          },
        });
      }
    });
  }
  submitForm() {
    if (!this.conditionsAccepted) {
      alert('Veuillez accepter les conditions générales.');
      return;
    }
    console.log('Mail envoyé à : ' + this.school?.mail);
  }
}
