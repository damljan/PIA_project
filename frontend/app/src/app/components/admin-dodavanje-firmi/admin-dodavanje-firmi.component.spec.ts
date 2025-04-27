import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodavanjeFirmiComponent } from './admin-dodavanje-firmi.component';

describe('AdminDodavanjeFirmiComponent', () => {
  let component: AdminDodavanjeFirmiComponent;
  let fixture: ComponentFixture<AdminDodavanjeFirmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDodavanjeFirmiComponent]
    });
    fixture = TestBed.createComponent(AdminDodavanjeFirmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
