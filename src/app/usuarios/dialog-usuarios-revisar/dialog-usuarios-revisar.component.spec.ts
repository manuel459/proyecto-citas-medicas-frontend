import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUsuariosRevisarComponent } from './dialog-usuarios-revisar.component';

describe('DialogUsuariosRevisarComponent', () => {
  let component: DialogUsuariosRevisarComponent;
  let fixture: ComponentFixture<DialogUsuariosRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUsuariosRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUsuariosRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
