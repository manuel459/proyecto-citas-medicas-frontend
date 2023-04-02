import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloPagosComponent } from './modulo-pagos.component';

describe('ModuloPagosComponent', () => {
  let component: ModuloPagosComponent;
  let fixture: ComponentFixture<ModuloPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
