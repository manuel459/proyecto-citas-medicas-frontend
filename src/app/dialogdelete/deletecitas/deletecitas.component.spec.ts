import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecitasComponent } from './deletecitas.component';

describe('DeletecitasComponent', () => {
  let component: DeletecitasComponent;
  let fixture: ComponentFixture<DeletecitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
