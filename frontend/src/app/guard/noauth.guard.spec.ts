import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noauthGuard } from './noauth.guard';

describe('noauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
