import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemedicoComponent } from './deletemedico.component';

describe('DeletemedicoComponent', () => {
  let component: DeletemedicoComponent;
  let fixture: ComponentFixture<DeletemedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletemedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
