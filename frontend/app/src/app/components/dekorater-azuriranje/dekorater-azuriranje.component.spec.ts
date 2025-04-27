import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterAzuriranjeComponent } from './dekorater-azuriranje.component';

describe('DekoraterAzuriranjeComponent', () => {
  let component: DekoraterAzuriranjeComponent;
  let fixture: ComponentFixture<DekoraterAzuriranjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterAzuriranjeComponent]
    });
    fixture = TestBed.createComponent(DekoraterAzuriranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
