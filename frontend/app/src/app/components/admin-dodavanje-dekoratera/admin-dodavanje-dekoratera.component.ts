import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-admin-dodavanje-dekoratera',
  templateUrl: './admin-dodavanje-dekoratera.component.html',
  styleUrls: ['./admin-dodavanje-dekoratera.component.css']
})
export class AdminDodavanjeDekorateraComponent implements OnInit {
  korisnicko_ime: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  kontakt_telefon: string = "";
  imejl: string = "";
  profilna_slika: string = "";
  dekorater_firma: string = "";

  selectedFile: File | undefined;
  picture_error: string = "";

  error: string = "";
  error_jedinstveno_kor_ime: string = "";
  error_jedinstveni_imejl: string = "";
  error_format_lozinke: string = "";
  error_format_adrese: string = "";
  error_format_telefona: string = "";
  error_firma: string = "";

  // jedinstveni podaci
  usernames: Set<string> = new Set<string>();
  emails: Set<string> = new Set<string>();
  
  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void { 
    this.korisnikService.dohvatiSveKorisnike().subscribe((korisnici: Korisnik[]) => {
      korisnici.forEach(korisnik => {
        this.usernames.add(korisnik.korisnicko_ime);
        this.emails.add(korisnik.imejl);
      })
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.picture_error = "";
    }
  }

  registracija() {
    this.resetErrors();

    if (!this.korisnicko_ime || !this.lozinka || !this.ime || !this.prezime || 
      !this.pol || !this.adresa || !this.kontakt_telefon || !this.imejl || !this.dekorater_firma) {
        this.error = "Niste uneli sve neophodne podatke!";
        return;
    }

    if (this.usernames.has(this.korisnicko_ime)) {
      this.error_jedinstveno_kor_ime = "Uneto korisničko ime je zauzeto!";
      return;
    }

    if (this.emails.has(this.imejl)) {
      this.error_jedinstveni_imejl = "Uneta imejl adresa je zauzeta!";
      return;
    }

    if(!this.proveraLozinke(this.lozinka)) {
      this.error_format_lozinke = "Uneta lozinka nije u traženom formatu!";
      return;
    }

    if(!this.proveraAdrese(this.adresa)) {
      this.error_format_adrese = "Uneta adresa nije u traženom formatu!";
      return;
    }

    if (!this.proveraTelefona(this.kontakt_telefon)) {
      this.error_format_telefona = "Uneti kontakt telefon nije u traženom formatu!";
      return;
    }

    if (!this.dekorater_firma) {
      this.error_firma = "Niste uneli firmu u kojoj je dekorater zaposlen!";
      return;
    }

    if (this.selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(this.selectedFile);
      img.onload = () => {
        if (img.width < 100 || img.width > 300 || img.height < 100 || img.height > 300) {
          this.picture_error = 'Dimenzije fotografije su izvan dozvoljenog opsega!';
        } 
        else {
          this.korisnikService.otpremi(this.selectedFile!).subscribe((resp: UploadResponse) => {
            if (resp.msg === 'ok') {
              this.profilna_slika = resp.filePath;
              this.korisnikService.registracija(
                this.korisnicko_ime,
                this.lozinka,
                this.ime,
                this.prezime,
                this.pol,
                this.adresa,
                this.kontakt_telefon,
                this.imejl,
                this.profilna_slika ? this.profilna_slika : 'user_default.png',
                "",
                "dekorater",
                "",
                "aktivan",
                this.dekorater_firma
              ).subscribe(resp => {
                alert("Novi dekorater je evidentiran!");
                this.router.navigate(['admin']);
              });
            }
          });
        }
      };
    } else {
      // Kada nije odabrana profilna slika
      this.korisnikService.registracija(
        this.korisnicko_ime,
        this.lozinka,
        this.ime,
        this.prezime,
        this.pol,
        this.adresa,
        this.kontakt_telefon,
        this.imejl,
        this.profilna_slika ? this.profilna_slika : 'user_default.png',
        "",
        "dekorater",
        "",
        "aktivan",
        this.dekorater_firma
      ).subscribe(resp => {
        alert("Novi dekorater je evidentiran!");
        this.router.navigate(['admin']);
      });
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

  resetErrors() {
    this.error = "";
    this.error_jedinstveno_kor_ime = "";
    this.error_jedinstveni_imejl = "";
    this.error_format_lozinke = "";
    this.error_format_adrese = "";
    this.error_format_telefona = "";
    this.error_firma = "";
    this.picture_error = "";
  }

  onKorisnickoImeChange() {
    this.resetErrors();
  }
  
  onLozinkaChange() {
    this.resetErrors();
  }
  
  onImejlChange() {
    this.resetErrors();
  }
  
  onAdresaChange() {
    this.resetErrors();
  }
  
  onTelefonChange() {
    this.resetErrors();
  }
  
  onFirmaChange() {
    this.resetErrors();
  }
  
}

// Interfejs za tipizaciju server odgovora
interface UploadResponse {
  msg: string;
  filePath: string;
}