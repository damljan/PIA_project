import { TestBed } from '@angular/core/testing';

import { BastaService } from './basta.service';

describe('BastaService', () => {
  let service: BastaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BastaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
