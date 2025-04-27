import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css']
})
export class PrijavaAdminComponent implements OnInit {

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
        this.greska = "Administrator nije pronađen!";
      } else if (resp.msg === 'bad_password') {
        this.greska = "Pogrešna lozinka!";
      } else if (resp.korisnik) {
        if (resp.korisnik.tip === 'administrator') {
          this.router.navigate(['admin']);
        } else {
          this.greska = "Na ovaj način nije moguće prijaviti se kao " + resp.korisnik.tip + '!';
        }
      }
    }, error => {
      this.greska = "Došlo je do greške na serveru.";
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
