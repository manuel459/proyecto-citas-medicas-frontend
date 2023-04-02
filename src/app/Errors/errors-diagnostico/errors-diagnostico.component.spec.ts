import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsDiagnosticoComponent } from './errors-diagnostico.component';

describe('ErrorsDiagnosticoComponent', () => {
  let component: ErrorsDiagnosticoComponent;
  let fixture: ComponentFixture<ErrorsDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsDiagnosticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
