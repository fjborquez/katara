import { TestBed } from '@angular/core/testing';

import { UserHousesService } from './user-houses.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserHousesService', () => {
  let service: UserHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(UserHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
