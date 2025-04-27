import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { PrijavaAdminComponent } from './components/prijava-admin/prijava-admin.component';
import { RegistracijaVlasnikComponent } from './components/registracija-vlasnik/registracija-vlasnik.component';
import { VlasnikComponent } from './components/vlasnik/vlasnik.component';
import { DekoraterComponent } from './components/dekorater/dekorater.component';
import { AdminComponent } from './components/admin/admin.component';
import { PromenaLozinkeComponent } from './components/promena-lozinke/promena-lozinke.component';
import { AdminSpiskoviComponent } from './components/admin-spiskovi/admin-spiskovi.component';
import { AdminAzuriranjaComponent } from './components/admin-azuriranja/admin-azuriranja.component';
import { AdminDeaktivacijeComponent } from './components/admin-deaktivacije/admin-deaktivacije.component';
import { AdminZahteviComponent } from './components/admin-zahtevi/admin-zahtevi.component';
import { AdminDodavanjeDekorateraComponent } from './components/admin-dodavanje-dekoratera/admin-dodavanje-dekoratera.component';
import { AdminDodavanjeFirmiComponent } from './components/admin-dodavanje-firmi/admin-dodavanje-firmi.component';
import { AzuriranjeComponent } from './components/azuriranje/azuriranje.component';
import { VlasnikProfilComponent } from './components/vlasnik-profil/vlasnik-profil.component';
import { VlasnikOdrzavanjeComponent } from './components/vlasnik-odrzavanje/vlasnik-odrzavanje.component';
import { VlasnikFirmeComponent } from './components/vlasnik-firme/vlasnik-firme.component';
import { VlasnikZakazivanjaComponent } from './components/vlasnik-zakazivanja/vlasnik-zakazivanja.component';
import { VlasnikAzuriranjeComponent } from './components/vlasnik-azuriranje/vlasnik-azuriranje.component';
import { DekoraterProfilComponent } from './components/dekorater-profil/dekorater-profil.component';
import { DekoraterZakazivanjaComponent } from './components/dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './components/dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterStatistikaComponent } from './components/dekorater-statistika/dekorater-statistika.component';
import { DekoraterAzuriranjeComponent } from './components/dekorater-azuriranje/dekorater-azuriranje.component';
import { FirmaInfoComponent } from './components/firma-info/firma-info.component';
import { KomentarOcenaComponent } from './components/komentar-ocena/komentar-ocena.component';
import { OdrzavanjeZakazivanjeComponent } from './components/odrzavanje-zakazivanje/odrzavanje-zakazivanje.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    PrijavaAdminComponent,
    RegistracijaVlasnikComponent,
    VlasnikComponent,
    DekoraterComponent,
    AdminComponent,
    PromenaLozinkeComponent,
    AdminSpiskoviComponent,
    AdminAzuriranjaComponent,
    AdminDeaktivacijeComponent,
    AdminZahteviComponent,
    AdminDodavanjeDekorateraComponent,
    AdminDodavanjeFirmiComponent,
    AzuriranjeComponent,
    VlasnikProfilComponent,
    VlasnikOdrzavanjeComponent,
    VlasnikFirmeComponent,
    VlasnikZakazivanjaComponent,
    VlasnikAzuriranjeComponent,
    DekoraterProfilComponent,
    DekoraterZakazivanjaComponent,
    DekoraterOdrzavanjaComponent,
    DekoraterStatistikaComponent,
    DekoraterAzuriranjeComponent,
    FirmaInfoComponent,
    KomentarOcenaComponent,
    OdrzavanjeZakazivanjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
