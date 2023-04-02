import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdimistradorComponent } from './menu-adimistrador.component';

describe('MenuAdimistradorComponent', () => {
  let component: MenuAdimistradorComponent;
  let fixture: ComponentFixture<MenuAdimistradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAdimistradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdimistradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
