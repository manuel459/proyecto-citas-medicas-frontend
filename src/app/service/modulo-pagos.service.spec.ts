import { TestBed } from '@angular/core/testing';

import { ModuloPagosService } from './modulo-pagos.service';

describe('ModuloPagosService', () => {
  let service: ModuloPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuloPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
