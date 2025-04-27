import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpiskoviComponent } from './admin-spiskovi.component';

describe('AdminSpiskoviComponent', () => {
  let component: AdminSpiskoviComponent;
  let fixture: ComponentFixture<AdminSpiskoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSpiskoviComponent]
    });
    fixture = TestBed.createComponent(AdminSpiskoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
