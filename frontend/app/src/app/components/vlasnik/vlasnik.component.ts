import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vlasnik',
  templateUrl: './vlasnik.component.html',
  styleUrls: ['./vlasnik.component.css']
})
export class VlasnikComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  idiNaProfil() {
    this.router.navigate(['vlasnik-profil']);
  }

  idiNaFirme() {
    this.router.navigate(['vlasnik-firme']);
  }

  idiNaZakazivanja() {
    this.router.navigate(['vlasnik-zakazivanja']);
  }

  idiNaOdrzavanje() {
    this.router.navigate(['vlasnik-odrzavanje']);
  }

}
