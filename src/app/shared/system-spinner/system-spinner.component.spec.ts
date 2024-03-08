import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSpinnerComponent } from './system-spinner.component';

describe('SystemSpinnerComponent', () => {
  let component: SystemSpinnerComponent;
  let fixture: ComponentFixture<SystemSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemSpinnerComponent]
    });
    fixture = TestBed.createComponent(SystemSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
