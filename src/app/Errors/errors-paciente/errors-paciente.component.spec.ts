import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsPacienteComponent } from './errors-paciente.component';

describe('ErrorsPacienteComponent', () => {
  let component: ErrorsPacienteComponent;
  let fixture: ComponentFixture<ErrorsPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
