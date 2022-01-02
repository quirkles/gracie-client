import { TestBed } from '@angular/core/testing';

import { SplashGuardGuard } from './splash-guard.guard';

describe('SplashGuardGuard', () => {
  let guard: SplashGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SplashGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
