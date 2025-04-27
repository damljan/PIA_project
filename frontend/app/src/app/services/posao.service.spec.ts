import { TestBed } from '@angular/core/testing';

import { PosaoService } from './posao.service';

describe('PosaoService', () => {
  let service: PosaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
