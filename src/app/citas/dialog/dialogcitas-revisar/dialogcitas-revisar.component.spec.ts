import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcitasRevisarComponent } from './dialogcitas-revisar.component';

describe('DialogcitasRevisarComponent', () => {
  let component: DialogcitasRevisarComponent;
  let fixture: ComponentFixture<DialogcitasRevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcitasRevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcitasRevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
