import { TestBed } from '@angular/core/testing';

import { ToolbarButtonsService } from './toolbar-buttons.service';

describe('ToolbarButtonsService', () => {
  let service: ToolbarButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
