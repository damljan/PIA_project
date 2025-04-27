import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeaktivacijeComponent } from './admin-deaktivacije.component';

describe('AdminDeaktivacijeComponent', () => {
  let component: AdminDeaktivacijeComponent;
  let fixture: ComponentFixture<AdminDeaktivacijeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeaktivacijeComponent]
    });
    fixture = TestBed.createComponent(AdminDeaktivacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
