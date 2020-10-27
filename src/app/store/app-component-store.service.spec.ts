import { TestBed } from '@angular/core/testing';

import { AppComponentStoreService } from './app-component-store.service';

describe('AppComponentStoreService', () => {
  let service: AppComponentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComponentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
