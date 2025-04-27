import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  kor_ime: string = "";
  stara_lozinka: string = "";
  nova_lozinka: string = "";
  potvrda_lozinke: string = "";

  error: string = "";


  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
   
  }

  promenaLozinke() {
    if (!this.kor_ime || !this.stara_lozinka || !this.nova_lozinka || !this.potvrda_lozinke) {
      this.error = "Niste uneli sve neophodne podatke!";
      return;
    }

    if (this.nova_lozinka != this.potvrda_lozinke) {
      this.error = "Potvrda lozinke nije korektna!";
      return;
    }

    if (!this.proveraLozinke(this.nova_lozinka)) {
      this.error = "Nova lozinka nije u traženom formatu!";
      return;
    }

    this.korisnikService.proveraLozinke(this.kor_ime, this.stara_lozinka).subscribe(resp => {
      if (resp['msg'] == 'ok') {
        this.korisnikService.promenaLozinke(this.kor_ime, this.nova_lozinka).subscribe(resp => {
          if (resp['msg'] == 'updated_password') {
            alert("Nova lozinka je postavljena!");
            this.korisnikService.dohvatiKorisnika(this.kor_ime).subscribe((k:Korisnik) => {
              this.korisnik = k;
              if (this.korisnik.tip == 'administrator') {
                this.router.navigate(['prijava-admin']);
              }
              else {
                this.router.navigate(['prijava']);
              }
            });
            
          }
        })
      }
      else {
        this.error = "Uneta stara lozinka ne odgovara onoj u sistemu!";
      }
    })


  }

  proveraLozinke(lozinka: string): boolean {
    const passwordRegex = /^[A-Za-z](?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,9}$/;
  
    return passwordRegex.test(lozinka);
  }

  resetErrors() {
    this.error = "";
  }

  onUsernameChange() {
    this.resetErrors();
  }

  onOldPasswordChange() {
    this.resetErrors();
  }

  onNewPasswordChange() {
    this.resetErrors();
  }

  onAcceptPasswordChange() {
    this.resetErrors();
  }

}
