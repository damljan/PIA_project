import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { PrijavaAdminComponent } from './components/prijava-admin/prijava-admin.component';
import { RegistracijaVlasnikComponent } from './components/registracija-vlasnik/registracija-vlasnik.component';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
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
import { VlasnikFirmeComponent } from './components/vlasnik-firme/vlasnik-firme.component';
import { VlasnikProfilComponent } from './components/vlasnik-profil/vlasnik-profil.component';
import { VlasnikZakazivanjaComponent } from './components/vlasnik-zakazivanja/vlasnik-zakazivanja.component';
import { VlasnikOdrzavanjeComponent } from './components/vlasnik-odrzavanje/vlasnik-odrzavanje.component';
import { VlasnikAzuriranjeComponent } from './components/vlasnik-azuriranje/vlasnik-azuriranje.component';
import { DekoraterProfilComponent } from './components/dekorater-profil/dekorater-profil.component';
import { DekoraterZakazivanjaComponent } from './components/dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './components/dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterStatistikaComponent } from './components/dekorater-statistika/dekorater-statistika.component';
import { DekoraterAzuriranjeComponent } from './components/dekorater-azuriranje/dekorater-azuriranje.component';
import { FirmaInfoComponent } from './components/firma-info/firma-info.component';
import { KomentarOcenaComponent } from './components/komentar-ocena/komentar-ocena.component';
import { OdrzavanjeZakazivanjeComponent } from './components/odrzavanje-zakazivanje/odrzavanje-zakazivanje.component';

const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'prijava-admin', component: PrijavaAdminComponent },
  { path: 'registracija-vlasnik', component: RegistracijaVlasnikComponent },
  { path: 'promena-lozinke', component: PromenaLozinkeComponent },
  { path: 'vlasnik', component: VlasnikComponent },
  { path: 'dekorater', component: DekoraterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-spiskovi', component: AdminSpiskoviComponent },
  { path: 'admin-azuriranja', component: AdminAzuriranjaComponent },
  { path: 'admin-deaktivacije', component: AdminDeaktivacijeComponent },
  { path: 'admin-zahtevi', component: AdminZahteviComponent },
  { path: 'admin-dodavanje-dekoratera', component: AdminDodavanjeDekorateraComponent },
  { path: 'admin-dodavanje-firmi', component: AdminDodavanjeFirmiComponent },
  { path: 'azuriranje', component: AzuriranjeComponent },
  { path: 'vlasnik-firme', component: VlasnikFirmeComponent },
  { path: 'vlasnik-profil', component: VlasnikProfilComponent },
  { path: 'vlasnik-zakazivanja', component: VlasnikZakazivanjaComponent },
  { path: 'vlasnik-odrzavanje', component: VlasnikOdrzavanjeComponent },
  { path: 'vlasnik-azuriranje', component: VlasnikAzuriranjeComponent },
  { path: 'dekorater-profil', component: DekoraterProfilComponent },
  { path: 'dekorater-zakazivanja', component: DekoraterZakazivanjaComponent },
  { path: 'dekorater-odrzavanja', component: DekoraterOdrzavanjaComponent },
  { path: 'dekorater-statistika', component: DekoraterStatistikaComponent },
  { path: 'dekorater-azuriranje', component: DekoraterAzuriranjeComponent },
  { path: 'firma-info', component: FirmaInfoComponent },
  { path: 'komentar-ocena', component: KomentarOcenaComponent },
  { path: 'odrzavanje-zakazivanje', component: OdrzavanjeZakazivanjeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
