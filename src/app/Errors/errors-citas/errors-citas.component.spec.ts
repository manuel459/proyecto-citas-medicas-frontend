import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsCitasComponent } from './errors-citas.component';

describe('ErrorsCitasComponent', () => {
  let component: ErrorsCitasComponent;
  let fixture: ComponentFixture<ErrorsCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
