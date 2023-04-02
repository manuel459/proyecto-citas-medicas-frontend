import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclistaComponent } from './ciclista.component';

describe('CiclistaComponent', () => {
  let component: CiclistaComponent;
  let fixture: ComponentFixture<CiclistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiclistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiclistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
