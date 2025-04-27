import { Component, OnInit } from '@angular/core';
import { Firma } from 'src/app/models/firma';
import { Korisnik } from 'src/app/models/korisnik';
import { FirmaService } from 'src/app/services/firma.service';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-admin-spiskovi',
  templateUrl: './admin-spiskovi.component.html',
  styleUrls: ['./admin-spiskovi.component.css']
})
export class AdminSpiskoviComponent implements OnInit {

  sviKorisnici: Korisnik[] = [];
  sveFirme: Firma[] = [];

  constructor(private korisnikService: KorisnikService, private firmaService: FirmaService) { }

  ngOnInit(): void {
    this.korisnikService.dohvatiSveKorisnikeOsimAdmina().subscribe((k: Korisnik[]) => {
      this.sviKorisnici = k;
      this.sviKorisnici.sort(
        (k1, k2) => {
          if (k1.tip > k2.tip) {
            return 1;
          }
          else if (k1.tip < k2.tip) {
            return -1;
          }
          else {
            return 0;
          }
        }
      )
    })

    this.firmaService.dohvatiSveFirme().subscribe((firme: Firma[]) => {
      this.sveFirme = firme;
      this.sveFirme.sort(
        (f1, f2) => {
          if (f1.naziv > f2.naziv) {
            return 1;
          }
          else if (f1.naziv < f2.naziv) {
            return -1;
          }
          else {
            return 0;
          }
        }
      )
    })
  }

}
