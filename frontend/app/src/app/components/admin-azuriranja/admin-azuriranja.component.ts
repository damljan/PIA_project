import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-admin-azuriranja',
  templateUrl: './admin-azuriranja.component.html',
  styleUrls: ['./admin-azuriranja.component.css']
})
export class AdminAzuriranjaComponent implements OnInit {

  sviKorisnici: Korisnik[] = [];

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnikService.dohvatiSveKorisnikeOsimAdmina().subscribe((k: Korisnik[]) => {
      this.sviKorisnici = k;
      this.sviKorisnici.sort(
        (k1, k2) => {
          if (k1 > k2) {
            return 1;
          }
          else if (k1 < k2) {
            return -1;
          }
          else {
            return 0;
          }
        }
      )
    })
  }

  azurirajKorisnika(kor_ime: string) {
    localStorage.setItem('izabrani_kor_za_azuriranje', kor_ime);
    this.router.navigate(['azuriranje']);
  }

}
