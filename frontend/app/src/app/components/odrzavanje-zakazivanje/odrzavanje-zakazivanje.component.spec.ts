import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdrzavanjeZakazivanjeComponent } from './odrzavanje-zakazivanje.component';

describe('OdrzavanjeZakazivanjeComponent', () => {
  let component: OdrzavanjeZakazivanjeComponent;
  let fixture: ComponentFixture<OdrzavanjeZakazivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdrzavanjeZakazivanjeComponent]
    });
    fixture = TestBed.createComponent(OdrzavanjeZakazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
