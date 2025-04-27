import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikAzuriranjeComponent } from './vlasnik-azuriranje.component';

describe('VlasnikAzuriranjeComponent', () => {
  let component: VlasnikAzuriranjeComponent;
  let fixture: ComponentFixture<VlasnikAzuriranjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikAzuriranjeComponent]
    });
    fixture = TestBed.createComponent(VlasnikAzuriranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
