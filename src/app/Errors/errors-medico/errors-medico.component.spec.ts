import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsMedicoComponent } from './errors-medico.component';

describe('ErrorsMedicoComponent', () => {
  let component: ErrorsMedicoComponent;
  let fixture: ComponentFixture<ErrorsMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
