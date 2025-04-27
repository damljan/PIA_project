import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basta } from '../models/basta';

@Injectable({
  providedIn: 'root'
})
export class BastaService {

  constructor(private http: HttpClient) { }

  dohvatiBastuVlasnika(vlasnik: string) {
    const data = {
      vlasnik: vlasnik
    }

    return this.http.post<Basta>('http://localhost:4000/baste/dohvatiBastuVlasnika', data);
  }
}
