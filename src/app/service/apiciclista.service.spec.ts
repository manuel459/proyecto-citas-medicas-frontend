import { TestBed } from '@angular/core/testing';

import { ApiciclistaService } from './apiciclista.service';

describe('ApiciclistaService', () => {
  let service: ApiciclistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiciclistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
