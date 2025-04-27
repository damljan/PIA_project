import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentarOcenaComponent } from './komentar-ocena.component';

describe('KomentarOcenaComponent', () => {
  let component: KomentarOcenaComponent;
  let fixture: ComponentFixture<KomentarOcenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KomentarOcenaComponent]
    });
    fixture = TestBed.createComponent(KomentarOcenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
