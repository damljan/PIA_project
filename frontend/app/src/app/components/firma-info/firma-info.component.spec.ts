import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaInfoComponent } from './firma-info.component';

describe('FirmaInfoComponent', () => {
  let component: FirmaInfoComponent;
  let fixture: ComponentFixture<FirmaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmaInfoComponent]
    });
    fixture = TestBed.createComponent(FirmaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
