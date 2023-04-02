import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpacienteRevisarComponent } from './dialogpaciente-revisar.component';

describe('DialogpacienteRevisarComponent', () => {
  let component: DialogpacienteRevisarComponent;
  let fixture: ComponentFixture<DialogpacienteRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpacienteRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpacienteRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
