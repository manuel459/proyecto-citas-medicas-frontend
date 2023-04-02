import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcitasComponent } from './dialogcitas.component';

describe('DialogcitasComponent', () => {
  let component: DialogcitasComponent;
  let fixture: ComponentFixture<DialogcitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
