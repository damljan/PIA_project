import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-vlasnik-profil',
  templateUrl: './vlasnik-profil.component.html',
  styleUrls: ['./vlasnik-profil.component.css']
})
export class VlasnikProfilComponent implements OnInit {

  vlasnik: Korisnik = new Korisnik();

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    let ulogovan_vlasnik = localStorage.getItem('ulogovan_vlasnik');
    ulogovan_vlasnik = (ulogovan_vlasnik ? ulogovan_vlasnik : '');

    this.korisnikService.dohvatiKorisnika(ulogovan_vlasnik).subscribe((v: Korisnik) => {
      this.vlasnik = v;
    })
  }

  idiNaAzuriranjeVlasnika() {
    this.router.navigate(['vlasnik-azuriranje']);
  }

}
