import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepacienteComponent } from './deletepaciente.component';

describe('DeletepacienteComponent', () => {
  let component: DeletepacienteComponent;
  let fixture: ComponentFixture<DeletepacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletepacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
