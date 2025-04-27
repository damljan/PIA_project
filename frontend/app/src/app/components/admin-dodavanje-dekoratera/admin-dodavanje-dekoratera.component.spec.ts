import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodavanjeDekorateraComponent } from './admin-dodavanje-dekoratera.component';

describe('AdminDodavanjeDekorateraComponent', () => {
  let component: AdminDodavanjeDekorateraComponent;
  let fixture: ComponentFixture<AdminDodavanjeDekorateraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDodavanjeDekorateraComponent]
    });
    fixture = TestBed.createComponent(AdminDodavanjeDekorateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
