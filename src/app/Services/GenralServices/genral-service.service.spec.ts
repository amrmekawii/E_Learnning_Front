import { TestBed } from '@angular/core/testing';

import { GenralServiceService } from './genral-service.service';

describe('GenralServiceService', () => {
  let service: GenralServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenralServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
