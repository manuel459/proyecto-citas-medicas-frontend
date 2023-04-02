import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpacienteComponent } from './dialogpaciente.component';

describe('DialogpacienteComponent', () => {
  let component: DialogpacienteComponent;
  let fixture: ComponentFixture<DialogpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
