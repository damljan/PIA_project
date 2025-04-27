import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-admin-deaktivacije',
  templateUrl: './admin-deaktivacije.component.html',
  styleUrls: ['./admin-deaktivacije.component.css']
})
export class AdminDeaktivacijeComponent implements OnInit {

  prihvaceniVlasnici: Korisnik[] = [];
  aktivniDekorateri: Korisnik[] = [];
  blokiraniDekorateri: Korisnik[] = [];

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikService.dohvatiSvePrihvaceneVlasnike().subscribe((vlasnici: Korisnik[]) => {
      this.prihvaceniVlasnici = vlasnici;
      this.prihvaceniVlasnici.sort(
        (v1, v2) => {
          if (v1.ime < v2.ime) {
            return -1;
          }
          else if (v1.ime > v2.ime) {
            return 1;
          }
          else {
            return 0;
          }
        }
      )
    })

    this.korisnikService.dohvatiSveAktivneDekoratere().subscribe((dekorateri: Korisnik[]) => {
      this.aktivniDekorateri = dekorateri;
      this.aktivniDekorateri.sort(
        (v1, v2) => {
          if (v1.ime < v2.ime) {
            return -1;
          }
          else if (v1.ime > v2.ime) {
            return 1;
          }
          else {
            return 0;
          }
        }
      )
    })

    this.korisnikService.dohvatiSveBlokiraneDekoratere().subscribe((dekorateri: Korisnik[]) => {
      this.blokiraniDekorateri = dekorateri;
      this.blokiraniDekorateri.sort(
        (v1, v2) => {
          if (v1.ime < v2.ime) {
            return -1;
          }
          else if (v1.ime > v2.ime) {
            return 1;
          }
          else {
            return 0;
          }
        }
      )
    })
  }

  deaktivirajVlasnika(kor_ime: string) {
    this.korisnikService.blokirajVlasnika(kor_ime).subscribe(resp => {
      if (resp['msg'] == 'owner_blocked') {
        alert("Vlasnik je deaktiviran!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  deaktivirajDekoratera(kor_ime: string) {
    this.korisnikService.blokirajDekoratera(kor_ime).subscribe(resp => {
      if (resp['msg'] == 'decorator_blocked') {
        alert("Dekorater je deaktiviran!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  odblokirajDekoratera(kor_ime: string) {
    this.korisnikService.odblokirajDekoratera(kor_ime).subscribe(resp => {
      if (resp['msg'] == 'decorator_activated') {
        alert("Dekorater je odblokiran!");
        window.location.reload();
      }
      else {
        alert('Akcija nije uspela!');
      }
    })
  }

}
