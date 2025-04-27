import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firma } from '../models/firma';
import { Usluga } from '../models/usluga';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  constructor(private http: HttpClient) { }

  dodajNovuFirmu(
    naziv: string,
    adresa: string,
    usluge: Usluga[],
    kontakt_telefon: string,
    godisnji_odmor: { od: string, do: string },
    zaposleni_dekorateri: string
  ) {
    const data = {
      naziv: naziv,
      adresa: adresa,
      usluge: usluge,
      kontakt_telefon: kontakt_telefon,
      godisnji_odmor: godisnji_odmor,
      zaposleni_dekorateri: zaposleni_dekorateri
    }

    return this.http.post<{msg: string}>('http://localhost:4000/firme/dodajNovuFirmu', data);
  }

  dohvatiSveFirme() {
    return this.http.get<Firma[]>('http://localhost:4000/firme/dohvatiSveFirme');
  }

  dohvatiFirmuPoNazivu(naziv: string) {
    const data = {
      naziv: naziv
    }

    return this.http.post<Firma>('http://localhost:4000/firme/dohvatiFirmuPoNazivu', data);
  }
}
