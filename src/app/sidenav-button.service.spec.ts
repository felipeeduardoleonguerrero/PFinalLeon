import { TestBed } from '@angular/core/testing';

import { SidenavButtonService } from './sidenav-button.service';

describe('SidenavButtonService', () => {
  let service: SidenavButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
