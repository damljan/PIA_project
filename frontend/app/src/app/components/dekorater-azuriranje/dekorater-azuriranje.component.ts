import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-dekorater-azuriranje',
  templateUrl: './dekorater-azuriranje.component.html',
  styleUrls: ['./dekorater-azuriranje.component.css']
})
export class DekoraterAzuriranjeComponent implements OnInit {

  dekorater: Korisnik = new Korisnik();

  nova_adresa: string = "";
  novi_kontakt_telefon: string = "";
  novi_imejl: string = "";
  nova_profilna_slika: string = "";

  error: string = "";

  // jedinstveni podaci
  emails: Set<string> = new Set<string>();

  // upload profilne slike
  selectedFile: File | undefined;
  picture_error: string = "";

  constructor(private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    let ulogovan_dekorater = localStorage.getItem('ulogovan_dekorater');
    ulogovan_dekorater = (ulogovan_dekorater ? ulogovan_dekorater : '');

    this.korisnikService.dohvatiKorisnika(ulogovan_dekorater).subscribe((v: Korisnik) => {
      this.dekorater = v;
    })

    this.korisnikService.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      korisnici.forEach(korisnik => {
        this.emails.add(korisnik.imejl);
      })
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
    this.korisnikService.azurirajAdresu(this.dekorater.korisnicko_ime, this.nova_adresa).subscribe(resp => {
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
    this.korisnikService.azurirajKontaktTelefon(this.dekorater.korisnicko_ime, this.novi_kontakt_telefon).subscribe(resp => {
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
    this.korisnikService.azurirajImejl(this.dekorater.korisnicko_ime, this.novi_imejl).subscribe(resp => {
      if (resp['msg'] == 'email_updated') {
        alert("Nova e-mail adresa je postavljena!");
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
            this.korisnikService.azurirajProfilnuSliku(this.dekorater.korisnicko_ime, this.nova_profilna_slika).subscribe(resp => {
              if (resp['msg'] == 'photo_updated') {
                alert("Nova profilna slika je postavljena!");
                this.dekorater.profilna_slika = this.nova_profilna_slika;
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

  proveraAdrese(adresa: string): boolean {
    const addressRegex = /^[A-Za-zčćžšđČĆŽŠĐ\s]+\s\d+,\s[A-Za-zčćžšđČĆŽŠĐ\s]+,\s[A-Za-zčćžšđČĆŽŠĐ\s]+$/;

    return addressRegex.test(adresa);
  }

  proveraTelefona(telefon: string) {
    const phoneRegex = /^\+38\d{9,15}$/;

    return phoneRegex.test(telefon);
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
