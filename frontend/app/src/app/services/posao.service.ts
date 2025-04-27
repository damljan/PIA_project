import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posao } from '../models/posao';

@Injectable({
  providedIn: 'root'
})
export class PosaoService {

  constructor(private http: HttpClient) { }

  dodajNoviPosao(
    vlasnik: string,
    firma: string,
    dekorater: string,
    pocetak: string,
    zavrsetak: string,
    tip_baste: string,
    kvadratura: any,
    odabrane_usluge: {naziv: string}[],
    dodatni_zahtevi: string,
    status: string,
    fotografija: string,
    komentar: string,
    ocena: number,
    zakazano_odrzavanje: boolean,
    pocetak_odrzavanja: string,
    poslednje_odrzavanje: string
  ) {
    const data = {
      vlasnik: vlasnik,
      firma: firma,
      dekorater: dekorater,
      pocetak: pocetak,
      zavrsetak: zavrsetak,
      tip_baste: tip_baste,
      kvadratura: kvadratura,
      odabrane_usluge: odabrane_usluge,
      dodatni_zahtevi: dodatni_zahtevi,
      status: status,
      fotografija: fotografija,
      komentar: komentar,
      ocena: ocena,
      zakazano_odrzavanja: zakazano_odrzavanje,
      pocetak_odrzavanja: pocetak_odrzavanja,
      poslednje_odrzavanje: poslednje_odrzavanje
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/dodajNoviPosao', data);
  }

  dohvatiPoslovePoFirmi(naziv_firme: string) {
    const data = {
      naziv_firme: naziv_firme
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiPoslovePoFirmi', data);
  }

  dohvatiTrenutnaZakazivanja(vlasnik: string) {
    const data = {
      vlasnik: vlasnik
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiTrenutnaZakazivanja', data);
  }

  dohvatiPrethodnaZakazivanja(vlasnik: string) {
    const data = {
      vlasnik: vlasnik
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiPrethodnaZakazivanja', data);
  }

  otkaziPosao(idP: number) {
    const data = {
      idP: idP
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/otkaziPosao', data);
  }

  dodelaKomentaraOcene(idP: number, komentar: string, ocena: number) {
    const data = {
      idP: idP,
      komentar: komentar,
      ocena: ocena
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/dodelaKomentaraOcene', data);
  }

  zakaziOdrzavanje(idP: number, pocetak_odrzavanja: string) {
    const data = {
      idP: idP,
      pocetak_odrzavanja: pocetak_odrzavanja
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/zakaziOdrzavanje', data);
  }

  dohvatiVlasnikovaOdrzavanja(vlasnik: string) {
    const data = {
      vlasnik: vlasnik
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiVlasnikovaOdrzavanja', data);
  }

  dohvatiNeobradjeneZaFirmu(firma: string) {
    const data = {
      firma: firma
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiNeobradjeneZaFirmu', data);
  }

  potvrdiPosao(idP: number, dekorater: string) {
    const data = {
      idP: idP,
      dekorater: dekorater
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/potvrdiPosao', data);
  }

  odbijPosao(idP: number, dekorater: string, komentar: string) {
    const data = {
      idP: idP,
      dekorater: dekorater,
      komentar: komentar
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/odbijPosao', data);
  }

  dohvatiZaduzenjaDekoratera(dekorater: string) {
    const data = {
      dekorater: dekorater
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiZaduzenjaDekoratera', data);
  }

  otpremi(selectedFile: File) {
    let formData = new FormData();
    formData.append('image', selectedFile);
    return this.http.post<UploadResponse>('http://localhost:4000/poslovi/otpremi', formData);
  }

  zavrsiPosao(idP: number, zavrsetak: string, foto: string) {
    const data = {
      idP: idP,
      zavrsetak: zavrsetak,
      foto: foto
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/zavrsiPosao', data);
  }

  dohvatiZakazanaOdrzavanjaFirme(firma: string) {
    const data = {
      firma: firma
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiZakazanaOdrzavanjaFirme', data);
  }

  potvrdiOdrzavanje(idP: number, zavrsetak_odrzavanja: string) {
    const data = {
      idP: idP,
      zavrsetak_odrzavanja: zavrsetak_odrzavanja
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/potvrdiOdrzavanje', data);
  }

  odbijOdrzavanje(idP: number) {
    const data = {
      idP: idP
    }

    return this.http.post<{msg: string}>('http://localhost:4000/poslovi/odbijOdrzavanje', data);
  }

  dohvatiSvePosloveDekoratera(dekorater: string) {
    const data = {
      dekorater: dekorater
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiSvePosloveDekoratera', data);
  }

  dohvatiSveOcenjenePoslovePoFirmi(naziv_firme: string) {
    const data = {
      naziv_firme: naziv_firme
    }

    return this.http.post<Posao[]>('http://localhost:4000/poslovi/dohvatiSveOcenjenePoslovePoFirmi', data);
  }

  dohvatiSveZavrsenePoslove() {
    return this.http.get<Posao[]>('http://localhost:4000/poslovi/dohvatiSveZavrsenePoslove');
  }

  dohvatiSvePotvrdjenePoslove() {
    return this.http.get<Posao[]>('http://localhost:4000/poslovi/dohvatiSvePotvrdjenePoslove');
  }

  dohvatiSveZavrsenePosloveSaFoto() {
    return this.http.get<Posao[]>('http://localhost:4000/poslovi/dohvatiSveZavrsenePosloveSaFoto');
  }

}

// Interfejs za tipizaciju odgovora prilikom slanja slike
interface UploadResponse {
  msg: string;
  filePath: string;
}
