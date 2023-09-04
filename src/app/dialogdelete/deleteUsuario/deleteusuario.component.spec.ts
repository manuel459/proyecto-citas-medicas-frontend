import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteusuarioComponent } from './deleteusuario.component';

describe('DeleteusuarioComponent', () => {
  let component: DeleteusuarioComponent;
  let fixture: ComponentFixture<DeleteusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
