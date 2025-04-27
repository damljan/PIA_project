import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzuriranjaComponent } from './admin-azuriranja.component';

describe('AdminAzuriranjaComponent', () => {
  let component: AdminAzuriranjaComponent;
  let fixture: ComponentFixture<AdminAzuriranjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAzuriranjaComponent]
    });
    fixture = TestBed.createComponent(AdminAzuriranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
