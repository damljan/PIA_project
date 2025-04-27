import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-admin-zahtevi',
  templateUrl: './admin-zahtevi.component.html',
  styleUrls: ['./admin-zahtevi.component.css']
})
export class AdminZahteviComponent implements OnInit {

  vlasniciNaCekanju: Korisnik[] = [];

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnikService.dohvatiSveVlasnikeNaCekanju().subscribe((v: Korisnik[]) => {
      this.vlasniciNaCekanju = v;
      this.vlasniciNaCekanju.sort(
        (v1, v2) => {
          if (v1 > v2) {
            return -1;
          }
          else if (v1 < v2) {
            return 1;
          }
          else {
            return 0;
          }
        }
      )
    })
  }

  prihvatiVlasnika(kor_ime: string) {
    this.korisnikService.prihvatiVlasnika(kor_ime).subscribe(resp => {
      if (resp['msg'] == 'owner_accepted') {
        alert("Vlasnik je prihvaćen!");
        this.ngOnInit();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  odbijVlasnika(kor_ime: string) {
    this.korisnikService.odbijVlasnika(kor_ime).subscribe(resp => {
      if (resp['msg'] == 'owner_rejected') {
        alert("Vlasnik je odbijen!");
        this.ngOnInit();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

}
