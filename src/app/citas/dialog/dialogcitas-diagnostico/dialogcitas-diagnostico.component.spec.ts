import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcitasDiagnosticoComponent } from './dialogcitas-diagnostico.component';

describe('DialogcitasDiagnosticoComponent', () => {
  let component: DialogcitasDiagnosticoComponent;
  let fixture: ComponentFixture<DialogcitasDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcitasDiagnosticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcitasDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
