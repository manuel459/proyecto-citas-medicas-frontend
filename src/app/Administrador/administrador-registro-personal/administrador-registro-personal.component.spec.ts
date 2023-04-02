import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorRegistroPersonalComponent } from './administrador-registro-personal.component';

describe('AdministradorRegistroPersonalComponent', () => {
  let component: AdministradorRegistroPersonalComponent;
  let fixture: ComponentFixture<AdministradorRegistroPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorRegistroPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministradorRegistroPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
