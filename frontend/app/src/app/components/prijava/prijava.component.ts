import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  kor_ime: string = "";
  lozinka: string = "";

  greska: string = "";

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    
  }

  prijava() {
    if (!this.kor_ime || !this.lozinka) {
      this.greska = "Niste uneli sve neophodne podatke za prijavu!";
      return;
    }
    
    this.korisnikService.prijava(this.kor_ime, this.lozinka).subscribe((resp: LoginResponse) => {
      if (resp.msg === 'user_not_found') {
        this.greska = "Korisnik nije pronađen!";
      } else if (resp.msg === 'bad_password') {
        this.greska = "Pogrešna lozinka!";
      } else if (resp.korisnik) {
        if (resp.korisnik.tip === 'vlasnik') {
          if (resp.korisnik.vlasnik_status === 'prihvacen') {
            localStorage.setItem('ulogovan_vlasnik', resp.korisnik.korisnicko_ime);
            this.router.navigate(['vlasnik']);
          }
          else if (resp.korisnik.vlasnik_status === 'naCekanju') {
            this.greska = "Vaš zahtev za registracijom je evidentiran, molimo Vas da budete strpljivi!";
          }
          else {
            this.greska = "Vaš zahtev za registracijom je odbijen - ne možete pristupiti sistemu!";
          }
        }
        else if (resp.korisnik.tip === 'dekorater') {
          if (resp.korisnik.dekorater_status === 'aktivan') {
            localStorage.setItem('ulogovan_dekorater', resp.korisnik.korisnicko_ime);
            this.router.navigate(['dekorater']);
          }
          else {
            this.greska = "Trenutno ste blokirani od strane administratora - ne možete pristupiti sistemu!";
          }
        }
        else {
          this.greska = "Na ovaj način nije moguće prijaviti se kao administrator!";
        }
      }
    }, error => {
      this.greska = "Došlo je do greške na serveru!";
    });
  }

  resetError() {
    this.greska = "";
  }
  


}

// Interfejs za tipizaciju odgovora prilikom prijave
interface LoginResponse {
  msg: string;
  korisnik: Korisnik;
}

