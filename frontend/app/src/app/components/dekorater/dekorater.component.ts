import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dekorater',
  templateUrl: './dekorater.component.html',
  styleUrls: ['./dekorater.component.css']
})
export class DekoraterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  idiNaProfil() {
    this.router.navigate(['dekorater-profil']);
  }

  idiNaZakazivanja() {
    this.router.navigate(['dekorater-zakazivanja']);
  }

  idiNaOdrzavanja() {
    this.router.navigate(['dekorater-odrzavanja']);
  }

  idiNaStatistiku() {
    this.router.navigate(['dekorater-statistika']);
  }

}
