import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmedicoComponent } from './dialogmedico.component';

describe('DialogmedicoComponent', () => {
  let component: DialogmedicoComponent;
  let fixture: ComponentFixture<DialogmedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
