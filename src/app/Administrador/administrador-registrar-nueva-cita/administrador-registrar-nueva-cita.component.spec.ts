import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorRegistrarNuevaCitaComponent } from './administrador-registrar-nueva-cita.component';

describe('AdministradorRegistrarNuevaCitaComponent', () => {
  let component: AdministradorRegistrarNuevaCitaComponent;
  let fixture: ComponentFixture<AdministradorRegistrarNuevaCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorRegistrarNuevaCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorRegistrarNuevaCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
