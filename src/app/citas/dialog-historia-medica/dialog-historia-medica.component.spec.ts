import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoriaMedicaComponent } from './dialog-historia-medica.component';

describe('DialogHistoriaMedicaComponent', () => {
  let component: DialogHistoriaMedicaComponent;
  let fixture: ComponentFixture<DialogHistoriaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHistoriaMedicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistoriaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
