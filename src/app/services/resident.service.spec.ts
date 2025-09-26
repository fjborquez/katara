import { TestBed } from '@angular/core/testing';

import { ResidentService } from './resident.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ResidentService', () => {
  let service: ResidentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(ResidentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
