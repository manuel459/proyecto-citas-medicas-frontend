import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmedicoRevisarComponent } from './dialogmedico-revisar.component';

describe('DialogmedicoRevisarComponent', () => {
  let component: DialogmedicoRevisarComponent;
  let fixture: ComponentFixture<DialogmedicoRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmedicoRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmedicoRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
