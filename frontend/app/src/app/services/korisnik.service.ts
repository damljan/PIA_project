import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  registracija(
    korisnicko_ime: string,
    lozinka: string,
    ime: string,
    prezime: string,
    pol: string,
    adresa: string,
    kontakt_telefon: string,
    imejl: string,
    profilna_slika: string,
    kreditna_kartica: string,
    tip: string,
    vlasnik_status: string,
    dekorater_status: string,
    dekorater_firma: string
  ) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      kontakt_telefon: kontakt_telefon,
      imejl: imejl,
      profilna_slika: profilna_slika,
      kreditna_kartica: kreditna_kartica,
      tip: tip,
      vlasnik_status: vlasnik_status,
      dekorater_status: dekorater_status,
      dekorater_firma: dekorater_firma
    };

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/registracija', data);
  }

  otpremi(selectedFile: File) {
    let formData = new FormData();
    formData.append('image', selectedFile);
    return this.http.post<UploadResponse>('http://localhost:4000/korisnici/otpremi', formData);
  }

  prijava(korisnicko_ime: string, lozinka: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    };

    return this.http.post<LoginResponse>('http://localhost:4000/korisnici/prijava', data);
  }

  dohvatiSveKorisnike() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveKorisnike');
  }

  promenaLozinke(kor_ime: string, nova_lozinka: string) {
    const data = {
      kor_ime: kor_ime,
      nova_lozinka: nova_lozinka
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/promenaLozinke', data);
  }

  proveraLozinke(kor_ime: string, lozinka: string) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/proveraLozinke', data);
  }

  dohvatiKorisnika(kor_ime: string) {
    const data = {
      kor_ime: kor_ime
    }

    return this.http.post<Korisnik>('http://localhost:4000/korisnici/dohvatiKorisnika', data);
  }

  dohvatiSveKorisnikeOsimAdmina() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveKorisnikeOsimAdmina');
  }

  azurirajKorisnickoIme(ime: string, prezime: string, tip: string, novo_korisnicko_ime: string) {
    const data = {
      ime: ime,
      prezime: prezime,
      tip: tip,
      novo_korisnicko_ime: novo_korisnicko_ime
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajKorisnickoIme', data);
  }

  azurirajAdresu(korisnicko_ime: string, nova_adresa: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      nova_adresa: nova_adresa
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajAdresu', data);
  }

  azurirajKontaktTelefon(korisnicko_ime: string, novi_kontakt_telefon: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
     novi_kontakt_telefon: novi_kontakt_telefon
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajKontaktTelefon', data);
  }

  azurirajImejl(korisnicko_ime: string, novi_imejl: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      novi_imejl: novi_imejl
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajImejl', data);
  }

  azurirajKreditnuKarticu(korisnicko_ime: string, novi_broj_kreditne_kartice: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      novi_broj_kreditne_kartice: novi_broj_kreditne_kartice
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajKreditnuKarticu', data);
  }

  azurirajFirmu(korisnicko_ime: string, nova_firma: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      nova_firma: nova_firma
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajFirmu', data);
  }

  azurirajProfilnuSliku(korisnicko_ime: string, nova_slika: string) {
    const data = {
      korisnicko_ime: korisnicko_ime,
      nova_slika: nova_slika
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/azurirajProfilnuSliku', data);
  }

  dohvatiSvePrihvaceneVlasnike() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSvePrihvaceneVlasnike');
  }

  dohvatiSveAktivneDekoratere() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveAktivneDekoratere');
  }

  blokirajVlasnika(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/blokirajVlasnika', data);
  }

  blokirajDekoratera(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/blokirajDekoratera', data);
  }

  dohvatiSveVlasnikeNaCekanju() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveVlasnikeNaCekanju');
  }

  prihvatiVlasnika(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/prihvatiVlasnika', data);
  }

  odbijVlasnika(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/odbijVlasnika', data);
  }

  odblokirajDekoratera(korisnicko_ime: string) {
    const data = {
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post<{msg: string}>('http://localhost:4000/korisnici/odblokirajDekoratera', data);
  }

  dohvatiSveBlokiraneDekoratere() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveBlokiraneDekoratere');
  }

  dohvatiSveRegistrovaneVlasnike() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveRegistrovaneVlasnike');
  }

  dohvatiSveRegistrovaneDekoratere() {
    return this.http.get<Korisnik[]>('http://localhost:4000/korisnici/dohvatiSveRegistrovaneDekoratere');
  }

}

// Interfejs za tipizaciju odgovora prilikom slanja slike
interface UploadResponse {
  msg: string;
  filePath: string;
}

// Interfejs za tipizaciju odgovora prilikom prijave
interface LoginResponse {
  msg: string;
  korisnik: Korisnik;
}
