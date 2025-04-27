import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-dekorater-profil',
  templateUrl: './dekorater-profil.component.html',
  styleUrls: ['./dekorater-profil.component.css']
})
export class DekoraterProfilComponent implements OnInit {

  dekorater: Korisnik = new Korisnik();

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    let ulogovan_dekorater = localStorage.getItem('ulogovan_dekorater');
    ulogovan_dekorater = (ulogovan_dekorater ? ulogovan_dekorater : '');

    this.korisnikService.dohvatiKorisnika(ulogovan_dekorater).subscribe((v: Korisnik) => {
      this.dekorater = v;
    })
  }

  idiNaAzuriranjeDekoratera() {
    this.router.navigate(['dekorater-azuriranje']);
  }

}
