import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-azuriranje',
  templateUrl: './azuriranje.component.html',
  styleUrls: ['./azuriranje.component.css']
})
export class AzuriranjeComponent implements OnInit {

  izabraniKorisnik: Korisnik = new Korisnik();

  novo_kor_ime: string = "";
  nova_lozinka: string = "";
  nova_adresa: string = "";
  novi_kontakt_telefon: string = "";
  novi_imejl: string = "";
  nova_profilna_slika: string = "";
  novi_broj_kreditne_kartice: string = "";
  nova_firma: string = "";

  error = "";

  // jedinstveni podaci
  usernames: Set<string> = new Set<string>();
  emails: Set<string> = new Set<string>();

  // upload profilne slike
  selectedFile: File | undefined;
  picture_error: string = "";

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    let izabrani = localStorage.getItem('izabrani_kor_za_azuriranje');
    izabrani = (izabrani ? izabrani : '');

    this.korisnikService.dohvatiKorisnika(izabrani).subscribe((k: Korisnik) => {
      this.izabraniKorisnik = k;
    })

    this.korisnikService.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      korisnici.forEach(korisnik => {
        this.usernames.add(korisnik.korisnicko_ime);
        this.emails.add(korisnik.imejl);
      })
    })
  }

  azurirajKorisnickoIme() {
    if (!this.novo_kor_ime) {
      this.error = "Niste uneli novo korisničko ime!";
      return;
    }
    if (this.usernames.has(this.novo_kor_ime)) {
      this.error = "Uneto korisničko već postoji u sistemu!";
      return;
    }
    this.korisnikService.azurirajKorisnickoIme(this.izabraniKorisnik.ime, this.izabraniKorisnik.prezime, this.izabraniKorisnik.tip, this.novo_kor_ime).subscribe(resp => {
      if (resp['msg'] == "username_updated") {
        alert("Novo korisničko ime je postavljeno!");
        this.router.navigate(['admin-azuriranja']);
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  azurirajLozinku() {
    if (!this.nova_lozinka) {
      this.error = "Niste uneli novu lozinku!";
      return;
    }
    if (!this.proveraLozinke(this.nova_lozinka)) {
      this.error = "Uneta lozinka nije u traženom formatu!";
      return;
    }
    this.korisnikService.promenaLozinke(this.izabraniKorisnik.korisnicko_ime, this.nova_lozinka).subscribe(resp => {
      if (resp['msg'] == 'updated_password') {
        alert("Nova lozinka je postavljena!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!")
      }
    })
  }

  azurirajAdresu() {
    if (!this.nova_adresa) {
      this.error = "Niste uneli novu adresu!";
      return;
    }
    if (!this.proveraAdrese(this.nova_adresa)) {
      this.error = "Uneta adresa nije u traženom formatu!";
      return;
    }
    this.korisnikService.azurirajAdresu(this.izabraniKorisnik.korisnicko_ime, this.nova_adresa).subscribe(resp => {
      if (resp['msg'] == 'address_updated') {
        alert("Nova adresa je postavljena!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  azurirajKontaktTelefon() {
    if (!this.novi_kontakt_telefon) {
      this.error = "Niste uneli novi kontakt telefon!";
      return;
    }
    if (!this.proveraTelefona(this.novi_kontakt_telefon)) {
      this.error = "Uneti kontakt telefon nije u traženom formatu!";
      return;
    }
    this.korisnikService.azurirajKontaktTelefon(this.izabraniKorisnik.korisnicko_ime, this.novi_kontakt_telefon).subscribe(resp => {
      if (resp['msg'] == 'phone_updated') {
        alert("Novi kontakt telefon je postavljen!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  azurirajImejl() {
    if (!this.novi_imejl) {
      this.error = "Niste uneli novu e-mail adresu!";
      return;
    }
    if (this.emails.has(this.novi_imejl)) {
      this.error = "Uneta e-mail adresa već postoji u sistemu!";
      return;
    }
    this.korisnikService.azurirajImejl(this.izabraniKorisnik.korisnicko_ime, this.novi_imejl).subscribe(resp => {
      if (resp['msg'] == 'email_updated') {
        alert("Nova e-mail adresa je postavljena!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  azurirajKreditnuKarticu() {
    if (!this.novi_broj_kreditne_kartice) {
      this.error = "Niste uneli novi broj kreditne kartice!";
      return;
    }
    if (!this.proveraKreditneKartice(this.novi_broj_kreditne_kartice)) {
      this.error = "Broj kreditne kartice nije u traženom formatu!";
      return;
    }
    this.korisnikService.azurirajKreditnuKarticu(this.izabraniKorisnik.korisnicko_ime, this.novi_broj_kreditne_kartice).subscribe(resp => {
      if (resp['msg'] == 'card_updated') {
        alert("Novi broj kreditne kartice je postavljen!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  azurirajFirmu() {
    if (!this.nova_firma) {
      this.error = "Niste uneli novu firmu!";
      return;
    }
    this.korisnikService.azurirajFirmu(this.izabraniKorisnik.korisnicko_ime, this.nova_firma).subscribe(resp => {
      if (resp['msg'] == 'firm_updated') {
        alert("Nova firma je postavljena!");
        window.location.reload();
      }
      else {
        alert("Akcija nije uspela!");
      }
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.error = "";
    }
  }

  azurirajProfilnuSliku() {
    if (!this.selectedFile) {
      this.error = "Niste uvezli novu profilnu sliku!";
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(this.selectedFile);
    img.onload = () => {
      if (img.width < 100 || img.width > 300 || img.height < 100 || img.height > 300) {
        this.error = 'Dimenzije fotografije su izvan dozvoljenog opsega!';
      } else {
        this.korisnikService.otpremi(this.selectedFile!).subscribe((resp: UploadResponse) => {
          if (resp.msg === 'ok') {
            this.nova_profilna_slika = resp.filePath;
            this.korisnikService.azurirajProfilnuSliku(this.izabraniKorisnik.korisnicko_ime, this.nova_profilna_slika).subscribe(resp => {
              if (resp['msg'] == 'photo_updated') {
                alert("Nova profilna slika je postavljena!");
                this.izabraniKorisnik.profilna_slika = this.nova_profilna_slika;
                window.location.reload();
              } else {
                alert("Akcija nije uspela!");
              }
            });
          } else {
            this.error = 'Greška pri otpremanju slike!';
          }
        });
      }
    }
  }

  proveraLozinke(lozinka: string): boolean {
    const passwordRegex = /^[A-Za-z](?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,9}$/;

    return passwordRegex.test(lozinka);
  }

  proveraAdrese(adresa: string): boolean {
    const addressRegex = /^[A-Za-zčćžšđČĆŽŠĐ\s]+\s\d+,\s[A-Za-zčćžšđČĆŽŠĐ\s]+,\s[A-Za-zčćžšđČĆŽŠĐ\s]+$/;

    return addressRegex.test(adresa);
  }

  proveraTelefona(telefon: string) {
    const phoneRegex = /^\+38\d{9,15}$/;

    return phoneRegex.test(telefon);
  }

  proveraKreditneKartice(kartica: string) {
    const dinersRegex = /^(300|301|302|303|36|38)\d{11,12}$/;
    const mastercardRegex = /^(51|52|53|54|55)\d{14}$/;
    const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;

    return (dinersRegex.test(kartica) || mastercardRegex.test(kartica) || visaRegex.test(kartica));
  }

  onChangeResetError() {
    this.error = "";
  }

}

// Interfejs za tipizaciju server odgovora
interface UploadResponse {
  msg: string;
  filePath: string;
}
